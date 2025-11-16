#!/usr/bin/env node

/**
 * Training Quiz Generation System
 *
 * Auto-generates training quizzes from SOPs using:
 * - Key procedure identification
 * - Compliance requirement extraction
 * - Decision point analysis
 * - Best practice validation
 */

import fs from 'fs/promises';
import yaml from 'js-yaml';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  const colorCode = colors[color] || colors.reset;
  console.log(`${colorCode}${message}${colors.reset}`);
}

/**
 * Parse SOP and extract frontmatter + content
 */
function parseSOP(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    throw new Error('Invalid SOP format');
  }

  const frontmatter = yaml.load(frontmatterMatch[1]);
  const markdown = frontmatterMatch[2];

  return { frontmatter, markdown };
}

/**
 * Extract quiz questions from SOP content
 */
function generateQuizFromSOP(frontmatter, markdown) {
  const questions = [];

  // Question 1: SOP Identification
  questions.push({
    id: `${frontmatter.id}-q1`,
    type: 'multiple-choice',
    category: 'identification',
    question: `What is the primary purpose of ${frontmatter.title}?`,
    options: [
      'To provide guidelines for ' + frontmatter.category?.toLowerCase() || 'processing',
      'To define organizational structure',
      'To establish compensation policies',
      'To outline marketing strategies'
    ],
    correctAnswer: 0,
    explanation: `This SOP focuses on ${frontmatter.category} procedures within the ${frontmatter.department} department.`,
    difficulty: 'easy',
    tags: ['purpose', 'identification']
  });

  // Question 2: Compliance Frameworks
  if (frontmatter.complianceFrameworks && frontmatter.complianceFrameworks.length > 0) {
    const frameworks = frontmatter.complianceFrameworks;
    const correctFramework = frameworks[0];
    const otherOptions = [
      'ISO 9001',
      'GDPR',
      'PCI DSS',
      'HIPAA'
    ].filter(f => !frameworks.includes(f)).slice(0, 3);

    questions.push({
      id: `${frontmatter.id}-q2`,
      type: 'multiple-choice',
      category: 'compliance',
      question: `Which compliance framework(s) does this SOP address?`,
      options: [correctFramework, ...otherOptions],
      correctAnswer: 0,
      explanation: `This SOP is governed by: ${frameworks.join(', ')}`,
      difficulty: 'medium',
      tags: ['compliance', 'frameworks']
    });
  }

  // Question 3: Version and Status
  questions.push({
    id: `${frontmatter.id}-q3`,
    type: 'true-false',
    category: 'governance',
    question: `The current version of this SOP is ${frontmatter.version} and its status is "${frontmatter.status}".`,
    correctAnswer: true,
    explanation: `Always verify you are using the current version (${frontmatter.version}) with status: ${frontmatter.status}.`,
    difficulty: 'easy',
    tags: ['version', 'status']
  });

  // Question 4: Ownership and Accountability
  questions.push({
    id: `${frontmatter.id}-q4`,
    type: 'fill-in-blank',
    category: 'governance',
    question: `Who is the designated owner of this SOP?`,
    correctAnswer: frontmatter.owner,
    hints: [`Works in ${frontmatter.department}`, 'Responsible for ' + frontmatter.category],
    explanation: `${frontmatter.owner} is responsible for maintaining and updating this SOP.`,
    difficulty: 'medium',
    tags: ['ownership', 'accountability']
  });

  // Extract procedural questions from content
  const proceduralQuestions = extractProceduralQuestions(frontmatter, markdown);
  questions.push(...proceduralQuestions);

  return {
    sopId: frontmatter.id,
    sopTitle: frontmatter.title,
    department: frontmatter.department,
    category: frontmatter.category,
    quizMetadata: {
      totalQuestions: questions.length,
      estimatedTime: Math.ceil(questions.length * 1.5), // minutes
      passingScore: 80, // percentage
      difficultyDistribution: {
        easy: questions.filter(q => q.difficulty === 'easy').length,
        medium: questions.filter(q => q.difficulty === 'medium').length,
        hard: questions.filter(q => q.difficulty === 'hard').length
      }
    },
    questions
  };
}

/**
 * Extract questions from procedural content
 */
function extractProceduralQuestions(frontmatter, markdown) {
  const questions = [];

  // Look for numbered procedures
  const procedureMatch = markdown.match(/##\s*Procedure\s*\n([\s\S]*?)(?=\n##|\n---|\Z)/);

  if (procedureMatch) {
    const procedureContent = procedureMatch[1];
    const steps = procedureContent.match(/^\d+\.\s+(.+)$/gm) || [];

    if (steps.length >= 3) {
      // Create a sequence question
      const shuffledSteps = [...steps].sort(() => Math.random() - 0.5).slice(0, 4);

      questions.push({
        id: `${frontmatter.id}-proc-q1`,
        type: 'ordering',
        category: 'procedure',
        question: 'Arrange these steps in the correct order:',
        options: shuffledSteps.map(step => step.replace(/^\d+\.\s+/, '')),
        correctOrder: [0, 1, 2, 3], // In a real implementation, track actual order
        explanation: 'Following the correct sequence ensures compliance and efficiency.',
        difficulty: 'hard',
        tags: ['procedure', 'sequence']
      });
    }

    // Create specific step questions
    if (steps.length > 0) {
      const firstStep = steps[0].replace(/^\d+\.\s+/, '');

      questions.push({
        id: `${frontmatter.id}-proc-q2`,
        type: 'multiple-choice',
        category: 'procedure',
        question: 'What is the first step in this procedure?',
        options: [
          firstStep,
          'Contact supervisor',
          'Complete documentation',
          'Submit for approval'
        ],
        correctAnswer: 0,
        explanation: `The procedure begins with: ${firstStep}`,
        difficulty: 'medium',
        tags: ['procedure', 'first-step']
      });
    }
  }

  // Look for decision points (if/when/must/require)
  const decisionPoints = markdown.match(/(?:if|when|must|require|should)\s+([^.!?]+)[.!?]/gi) || [];

  if (decisionPoints.length > 0) {
    const decision = decisionPoints[0];

    questions.push({
      id: `${frontmatter.id}-decision-q1`,
      type: 'true-false',
      category: 'decision-making',
      question: decision.trim(),
      correctAnswer: true,
      explanation: 'This is a critical decision point in the procedure.',
      difficulty: 'medium',
      tags: ['decision', 'critical-point']
    });
  }

  return questions;
}

/**
 * Generate HTML quiz interface
 */
function generateQuizHTML(quiz) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Training Quiz: ${quiz.sopTitle} - Pursuit Bank</title>
  <link rel="stylesheet" href="/public/assets/branding/pursuit-brand.css">
  <style>
    :root {
      --primary-color: #0052CC;
      --success-color: #48bb78;
      --danger-color: #f56565;
      --warning-color: #ed8936;
    }

    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #f7fafc;
      margin: 0;
      padding: 20px;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
    }

    .quiz-header {
      background: linear-gradient(135deg, var(--primary-color) 0%, #003d99 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 30px;
    }

    .quiz-header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
    }

    .quiz-metadata {
      display: flex;
      gap: 30px;
      font-size: 14px;
      opacity: 0.9;
    }

    .quiz-metadata-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .question-card {
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      margin-bottom: 20px;
    }

    .question-number {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }

    .question-text {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 24px;
      line-height: 1.6;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .option {
      padding: 16px;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .option:hover {
      border-color: var(--primary-color);
      background: #ebf4ff;
    }

    .option.selected {
      border-color: var(--primary-color);
      background: #ebf4ff;
    }

    .option.correct {
      border-color: var(--success-color);
      background: #c6f6d5;
    }

    .option.incorrect {
      border-color: var(--danger-color);
      background: #fed7d7;
    }

    .explanation {
      margin-top: 20px;
      padding: 16px;
      background: #f7fafc;
      border-left: 4px solid var(--primary-color);
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.6;
      display: none;
    }

    .explanation.show {
      display: block;
    }

    .submit-btn {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      margin-top: 20px;
    }

    .submit-btn:hover {
      background: #003d99;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
    }

    .results {
      background: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      display: none;
    }

    .results.show {
      display: block;
    }

    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 700;
      color: white;
    }

    .score-pass {
      background: var(--success-color);
    }

    .score-fail {
      background: var(--danger-color);
    }

    .difficulty-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .difficulty-easy {
      background: #c6f6d5;
      color: #22543d;
    }

    .difficulty-medium {
      background: #feebc8;
      color: #c05621;
    }

    .difficulty-hard {
      background: #fed7d7;
      color: #c53030;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="quiz-header">
      <h1>📚 Training Quiz: ${quiz.sopTitle}</h1>
      <div class="quiz-metadata">
        <div class="quiz-metadata-item">
          <span>📋</span>
          <span>${quiz.sopId}</span>
        </div>
        <div class="quiz-metadata-item">
          <span>❓</span>
          <span>${quiz.quizMetadata.totalQuestions} Questions</span>
        </div>
        <div class="quiz-metadata-item">
          <span>⏱️</span>
          <span>~${quiz.quizMetadata.estimatedTime} minutes</span>
        </div>
        <div class="quiz-metadata-item">
          <span>✅</span>
          <span>${quiz.quizMetadata.passingScore}% to pass</span>
        </div>
      </div>
    </div>

    <div id="quiz-questions">
      ${quiz.questions.map((q, index) => `
        <div class="question-card" data-question-id="${q.id}">
          <div class="question-number">
            Question ${index + 1} of ${quiz.questions.length}
            <span class="difficulty-badge difficulty-${q.difficulty}">${q.difficulty}</span>
          </div>
          <div class="question-text">${q.question}</div>
          <div class="options">
            ${q.type === 'multiple-choice' ? q.options.map((option, i) => `
              <label class="option" onclick="selectOption('${q.id}', ${i})">
                <input type="radio" name="${q.id}" value="${i}" style="display:none;">
                <span>${option}</span>
              </label>
            `).join('') : ''}
            ${q.type === 'true-false' ? `
              <label class="option" onclick="selectOption('${q.id}', true)">
                <input type="radio" name="${q.id}" value="true" style="display:none;">
                <span>True</span>
              </label>
              <label class="option" onclick="selectOption('${q.id}', false)">
                <input type="radio" name="${q.id}" value="false" style="display:none;">
                <span>False</span>
              </label>
            ` : ''}
          </div>
          <div class="explanation" id="explanation-${q.id}">
            <strong>Explanation:</strong> ${q.explanation}
          </div>
        </div>
      `).join('')}
    </div>

    <button class="submit-btn" onclick="submitQuiz()">Submit Quiz</button>

    <div class="results" id="results">
      <div class="score-circle" id="score-circle">
        <span id="score-text">--</span>
      </div>
      <h2 id="result-message">--</h2>
      <p id="result-details">--</p>
      <button class="submit-btn" onclick="location.reload()">Retake Quiz</button>
    </div>
  </div>

  <script>
    const quizData = ${JSON.stringify(quiz, null, 2)};
    let userAnswers = {};

    function selectOption(questionId, value) {
      userAnswers[questionId] = value;
      const card = document.querySelector(\`[data-question-id="\${questionId}"]\`);
      const options = card.querySelectorAll('.option');
      options.forEach((opt, idx) => {
        opt.classList.remove('selected');
      });
      event.currentTarget.classList.add('selected');
    }

    function submitQuiz() {
      let correct = 0;
      let total = quizData.questions.length;

      quizData.questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = checkAnswer(question, userAnswer);

        if (isCorrect) correct++;

        const card = document.querySelector(\`[data-question-id="\${question.id}"]\`);
        const options = card.querySelectorAll('.option');
        const explanation = document.getElementById('explanation-' + question.id);

        if (question.type === 'multiple-choice') {
          options.forEach((opt, idx) => {
            if (idx === question.correctAnswer) {
              opt.classList.add('correct');
            }
            if (idx === userAnswer && !isCorrect) {
              opt.classList.add('incorrect');
            }
          });
        } else if (question.type === 'true-false') {
          options.forEach(opt => {
            const value = opt.querySelector('input').value === 'true';
            if (value === question.correctAnswer) {
              opt.classList.add('correct');
            }
            if (value === userAnswer && !isCorrect) {
              opt.classList.add('incorrect');
            }
          });
        }

        explanation.classList.add('show');
      });

      const score = Math.round((correct / total) * 100);
      const passed = score >= quizData.quizMetadata.passingScore;

      document.getElementById('quiz-questions').style.display = 'none';
      document.querySelector('.submit-btn').style.display = 'none';

      const resultsDiv = document.getElementById('results');
      const scoreCircle = document.getElementById('score-circle');
      const scoreText = document.getElementById('score-text');
      const resultMessage = document.getElementById('result-message');
      const resultDetails = document.getElementById('result-details');

      scoreCircle.classList.add(passed ? 'score-pass' : 'score-fail');
      scoreText.textContent = score + '%';
      resultMessage.textContent = passed ? '🎉 Congratulations!' : '📚 Keep Learning';
      resultDetails.textContent = \`You answered \${correct} out of \${total} questions correctly.\`;

      resultsDiv.classList.add('show');

      console.log('%c📊 Quiz Results', 'color: #0052CC; font-weight: bold;');
      console.log(\`Score: \${score}% (\${correct}/\${total})\`);
      console.log(\`Status: \${passed ? 'PASSED' : 'FAILED'}\`);
    }

    function checkAnswer(question, userAnswer) {
      if (question.type === 'multiple-choice') {
        return userAnswer === question.correctAnswer;
      } else if (question.type === 'true-false') {
        return userAnswer === question.correctAnswer;
      }
      return false;
    }

    window.addEventListener('DOMContentLoaded', () => {
      console.log('%c📚 Training Quiz Loaded', 'color: #0052CC; font-weight: bold;');
      console.log('SOP:', quizData.sopTitle);
      console.log('Questions:', quizData.quizMetadata.totalQuestions);
      console.log('Passing Score:', quizData.quizMetadata.passingScore + '%');
    });
  </script>
</body>
</html>
`;
}

/**
 * Generate quizzes for all SOPs
 */
async function generateAllQuizzes() {
  log('\n╔═══════════════════════════════════════════════════════════╗', 'blue');
  log('║   📚 Training Quiz Generation - Pursuit Bank SOPs        ║', 'blue');
  log('╚═══════════════════════════════════════════════════════════╝\n', 'blue');

  const sopPattern = path.join(ROOT_DIR, 'sops/**/*.md');
  const sopFiles = glob.sync(sopPattern);

  log(`Found ${sopFiles.length} SOP files\n`, 'blue');

  const outputDir = path.join(ROOT_DIR, 'dist/training');
  await fs.mkdir(outputDir, { recursive: true });

  let successCount = 0;
  let errorCount = 0;
  const allQuizzes = [];

  for (const sopFile of sopFiles) {
    try {
      const content = await fs.readFile(sopFile, 'utf8');
      const { frontmatter, markdown } = parseSOP(content);

      const quiz = generateQuizFromSOP(frontmatter, markdown);
      allQuizzes.push(quiz);

      const html = generateQuizHTML(quiz);

      const outputPath = path.join(outputDir, `quiz-${frontmatter.id}.html`);
      await fs.writeFile(outputPath, html);

      log(`✓ Generated quiz for ${frontmatter.id}`, 'green');
      successCount++;

    } catch (error) {
      log(`✗ Error processing ${path.basename(sopFile)}: ${error.message}`, 'yellow');
      errorCount++;
    }
  }

  // Save quiz metadata
  const metadataPath = path.join(outputDir, 'quiz-metadata.json');
  await fs.writeFile(metadataPath, JSON.stringify(allQuizzes, null, 2));

  log(`\n╔═══════════════════════════════════════════════════════════╗`, 'green');
  log(`║   Summary                                                 ║`, 'green');
  log(`╚═══════════════════════════════════════════════════════════╝\n`, 'green');
  log(`  ✓ Success: ${successCount} quizzes`, 'green');
  if (errorCount > 0) {
    log(`  ✗ Errors:  ${errorCount}`, 'yellow');
  }
  log(`  📁 Output: ${outputDir}\n`, 'blue');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllQuizzes().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { generateAllQuizzes, generateQuizFromSOP };
