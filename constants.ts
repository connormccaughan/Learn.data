import { Course, Module, Project } from './types';

// Detailed outline for the first module of "Data Science with Python"
const dsPyModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Data Science with Python',
  classes: [
    {
      id: 'class-1',
      title: 'Python Fundamentals for Data Science',
      lessons: [
        { id: 'lesson-1', title: "The Data Scientist's Toolkit" },
        { id: 'lesson-2', title: 'Core Data Structures' },
        { id: 'lesson-3', title: 'Logic, Control Flow, and Filtering' },
        { id: 'lesson-4', title: 'Functions for Reusability' }
      ]
    },
    {
      id: 'class-2',
      title: 'Introduction to NumPy for Numerical Computing',
      lessons: [
        { id: 'lesson-1', title: 'The NumPy ndarray' },
        { id: 'lesson-2', title: 'Universal Functions (UFuncs) and Vectorization' },
        { id: 'lesson-3', title: 'Indexing, Slicing, and Broadcasting' },
        { id: 'lesson-4', title: 'Descriptive Statistics' }
      ]
    },
    {
      id: 'class-3',
      title: 'Data Manipulation with Pandas',
      lessons: [
        { id: 'lesson-1', title: 'Pandas Structures - Series and DataFrame' },
        { id: 'lesson-2', title: 'Data Ingestion and Inspection' },
        { id: 'lesson-3', title: 'Data Selection and Filtering' },
        { id: 'lesson-4', title: 'Data Cleaning - The First Step in Analysis' },
        { id: 'lesson-5', title: 'The Split-Apply-Combine Pattern with groupby()' },
        { id: 'lesson-6', title: 'Introduction to Time Series Data' }
      ]
    },
    {
      id: 'class-4',
      title: 'Data Visualization with Matplotlib and Seaborn',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Matplotlib' },
        { id: 'lesson-2', title: 'Visualizing Quantitative Data' },
        { id: 'lesson-3', title: 'Visualizing Categorical Data' },
        { id: 'lesson-4', title: 'High-Level Visualization with Seaborn' }
      ]
    }
  ]
};

const dsPyModule2: Module = {
  id: 'module-2',
  title: 'Machine Learning Foundations',
  classes: [
    {
      id: 'class-1',
      title: 'Introduction to Machine Learning',
      lessons: [
        { id: 'lesson-1', title: 'What is Machine Learning?' },
        { id: 'lesson-2', title: 'Supervised, Unsupervised, and Reinforcement Learning' },
        { id: 'lesson-3', title: 'The Machine Learning Workflow' },
      ],
    },
    {
      id: 'class-2',
      title: 'Supervised Learning: Regression',
      lessons: [
        { id: 'lesson-1', title: 'Linear Regression Theory' },
        { id: 'lesson-2', title: 'Implementation with scikit-learn' },
        { id: 'lesson-3', title: 'Model Evaluation for Regression' },
      ],
    },
    {
      id: 'class-3',
      title: 'Supervised Learning: Classification',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Classification' },
        { id: 'lesson-2', title: 'K-Nearest Neighbors (KNN)' },
        { id: 'lesson-3', title: 'Model Evaluation for Classification' },
      ],
    },
    {
      id: 'class-4',
      title: 'Preparing Data for Machine Learning',
      lessons: [
        { id: 'lesson-1', title: 'The Importance of the Train-Test Split' },
        { id: 'lesson-2', title: 'Feature Scaling and Normalization' },
        { id: 'lesson-3', title: 'Encoding Categorical Data' },
      ],
    },
  ],
};

const dsPyModule3: Module = {
  id: 'module-3',
  title: 'Advanced Data Wrangling and Feature Engineering',
  classes: [
    {
      id: 'class-1',
      title: 'Advanced Pandas Operations',
      lessons: [
        { id: 'lesson-1', title: 'Multi-level Indexing' },
        { id: 'lesson-2', title: 'Advanced GroupBy Operations' },
        { id: 'lesson-3', title: 'Combining DataFrames: Merge, Join, Concat' },
      ],
    },
    {
      id: 'class-2',
      title: 'Working with Time Series Data',
      lessons: [
        { id: 'lesson-1', title: 'Date and Time Objects in Pandas' },
        { id: 'lesson-2', title: 'Resampling and Windowing Functions' },
        { id: 'lesson-3', title: 'Visualizing Time Series' },
      ],
    },
    {
      id: 'class-3',
      title: 'Introduction to Feature Engineering',
      lessons: [
        { id: 'lesson-1', title: 'What is Feature Engineering?' },
        { id: 'lesson-2', title: 'Handling Categorical Data' },
        { id: 'lesson-3', title: 'Binning and Discretization' },
      ],
    },
    {
      id: 'class-4',
      title: 'Working with Text Data',
      lessons: [
        { id: 'lesson-1', title: 'Basic Text Preprocessing' },
        { id: 'lesson-2', title: 'Bag-of-Words and TF-IDF' },
        { id: 'lesson-3', title: 'Introduction to Regular Expressions' },
      ],
    },
  ],
};

const dsPyModule4: Module = {
  id: 'module-4',
  title: 'Supervised Learning in Depth',
  classes: [
    {
      id: 'class-1',
      title: 'Logistic Regression for Classification',
      lessons: [
        { id: 'lesson-1', title: 'Theory of Logistic Regression' },
        { id: 'lesson-2', title: 'Building a Classifier with scikit-learn' },
        { id: 'lesson-3', title: 'Interpreting Model Coefficients' },
      ],
    },
    {
      id: 'class-2',
      title: 'Decision Trees and Random Forests',
      lessons: [
        { id: 'lesson-1', title: 'Understanding Decision Trees' },
        { id: 'lesson-2', title: 'Overfitting and Pruning' },
        { id: 'lesson-3', title: 'Ensemble Learning: Random Forests' },
        { id: 'lesson-4', title: 'Feature Importance with Tree-Based Models' },
      ],
    },
    {
      id: 'class-3',
      title: 'Gradient Boosting Machines',
      lessons: [
        { id: 'lesson-1', title: 'The Concept of Boosting' },
        { id: 'lesson-2', title: 'Implementing XGBoost and LightGBM' },
        { id: 'lesson-3', title: 'Introduction to Hyperparameter Tuning' },
      ],
    },
    {
      id: 'class-4',
      title: 'Model Selection and Cross-Validation',
      lessons: [
        { id: 'lesson-1', title: 'The Bias-Variance Tradeoff' },
        { id: 'lesson-2', title: 'K-Fold Cross-Validation' },
        { id: 'lesson-3', title: 'Grid Search for Hyperparameter Optimization' },
      ],
    },
  ],
};

const dsPyModule5: Module = {
  id: 'module-5',
  title: 'Unsupervised Learning and Dimensionality Reduction',
  classes: [
    {
      id: 'class-1',
      title: 'Clustering with K-Means',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Unsupervised Learning' },
        { id: 'lesson-2', title: 'The K-Means Algorithm' },
        { id: 'lesson-3', title: 'Choosing K: The Elbow Method' },
        { id: 'lesson-4', title: 'Evaluating Clustering Performance' },
      ],
    },
    {
      id: 'class-2',
      title: 'Hierarchical Clustering',
      lessons: [
        { id: 'lesson-1', title: 'Agglomerative vs. Divisive Clustering' },
        { id: 'lesson-2', title: 'Understanding Dendrograms' },
      ],
    },
    {
      id: 'class-3',
      title: 'Principal Component Analysis (PCA)',
      lessons: [
        { id: 'lesson-1', title: 'The Need for Dimensionality Reduction' },
        { id: 'lesson-2', title: 'Theory and Geometry of PCA' },
        { id: 'lesson-3', title: 'Applying PCA with scikit-learn' },
      ],
    },
    {
      id: 'class-4',
      title: 'Association Rule Mining',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Market Basket Analysis' },
        { id: 'lesson-2', title: 'The Apriori Algorithm' },
        { id: 'lesson-3', title: 'Support, Confidence, and Lift' },
      ],
    },
  ],
};


// Detailed outline for "Machine Learning with Python"
const mlPyModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Machine Learning',
  classes: [
    {
      id: 'class-1',
      title: 'The Machine Learning Landscape',
      lessons: [
        { id: 'lesson-1', title: 'Core Terminology & Concepts' },
        { id: 'lesson-2', title: 'The End-to-End ML Project Workflow' },
        { id: 'lesson-3', title: 'Types of Learning Systems' },
        { id: 'lesson-4', title: 'Challenges: Overfitting & Underfitting' }
      ]
    },
    {
      id: 'class-2',
      title: 'Linear Models for Regression',
      lessons: [
        { id: 'lesson-1', title: 'Simple and Multiple Linear Regression' },
        { id: 'lesson-2', title: 'Gradient Descent: The Engine of Learning' },
        { id: 'lesson-3', title: 'Polynomial Regression for Non-linear Data' },
        { id: 'lesson-4', title: 'Regularization: Ridge, Lasso, and Elastic Net' }
      ]
    },
    {
      id: 'class-3',
      title: 'Linear Models for Classification',
      lessons: [
        { id: 'lesson-1', title: 'Logistic Regression: Theory and Application' },
        { id: 'lesson-2', title: 'Softmax Regression for Multi-class Problems' },
        { id: 'lesson-3', title: 'Decision Boundaries and Model Complexity' },
      ]
    },
    {
      id: 'class-4',
      title: 'Model Evaluation and Selection',
      lessons: [
        { id: 'lesson-1', title: 'Metrics for Regression (MSE, MAE, R²)' },
        { id: 'lesson-2', title: 'Metrics for Classification (Accuracy, Precision, Recall)' },
        { id: 'lesson-3', title: 'The Confusion Matrix and ROC Curves' },
        { id: 'lesson-4', title: 'Cross-Validation for Robust Assessment' }
      ]
    }
  ]
};

const mlPyModule2: Module = {
  id: 'module-2',
  title: 'Advanced Supervised Learning',
  classes: [
    {
      id: 'class-1',
      title: 'Support Vector Machines (SVMs)',
      lessons: [
        { id: 'lesson-1', title: 'Maximal Margin Classification' },
        { id: 'lesson-2', title: 'The Kernel Trick for Non-linear Data' },
        { id: 'lesson-3', title: 'Implementing SVMs with Scikit-Learn' },
      ]
    },
    {
      id: 'class-2',
      title: 'Decision Trees',
      lessons: [
        { id: 'lesson-1', title: 'Training and Visualizing a Decision Tree' },
        { id: 'lesson-2', title: 'Gini Impurity and Entropy' },
        { id: 'lesson-3', title: 'Regularization and Pruning' },
      ]
    },
    {
      id: 'class-3',
      title: 'Ensemble Learning and Random Forests',
      lessons: [
        { id: 'lesson-1', title: 'Voting Classifiers' },
        { id: 'lesson-2', title: 'Bagging and Pasting' },
        { id: 'lesson-3', title: 'Random Forests in Depth' },
        { id: 'lesson-4', title: 'Feature Importance with Forests' }
      ]
    },
    {
      id: 'class-4',
      title: 'Gradient Boosting',
      lessons: [
        { id: 'lesson-1', title: 'The Boosting Paradigm' },
        { id: 'lesson-2', title: 'Implementing XGBoost' },
        { id: 'lesson-3', title: 'Implementing LightGBM' },
        { id: 'lesson-4', title: 'A Guide to Hyperparameter Tuning' }
      ]
    }
  ]
};

const mlPyModule3: Module = {
  id: 'module-3',
  title: 'Unsupervised Learning',
  classes: [
    {
      id: 'class-1',
      title: 'Clustering Algorithms',
      lessons: [
        { id: 'lesson-1', title: 'K-Means Clustering' },
        { id: 'lesson-2', title: 'Finding the Optimal Number of Clusters' },
        { id: 'lesson-3', title: 'DBSCAN: Density-Based Clustering' },
        { id: 'lesson-4', title: 'Evaluating Clustering Performance' }
      ]
    },
    {
      id: 'class-2',
      title: 'Dimensionality Reduction',
      lessons: [
        { id: 'lesson-1', title: 'The Curse of Dimensionality' },
        { id: 'lesson-2', title: 'Principal Component Analysis (PCA)' },
        { id: 'lesson-3', title: 'Choosing the Right Number of Dimensions' },
        { id: 'lesson-4', title: 'Other Techniques: t-SNE for Visualization' }
      ]
    },
    {
      id: 'class-3',
      title: 'Anomaly Detection',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Anomaly Detection' },
        { id: 'lesson-2', title: 'Local Outlier Factor (LOF)' },
      ]
    }
  ]
};

const mlPyModule4: Module = {
  id: 'module-4',
  title: 'Introduction to Deep Learning',
  classes: [
    {
      id: 'class-1',
      title: 'From Biological to Artificial Neurons',
      lessons: [
        { id: 'lesson-1', title: 'The Perceptron' },
        { id: 'lesson-2', title: 'Multi-Layer Perceptrons and Backpropagation' },
        { id: 'lesson-3', title: 'Common Activation Functions' },
      ]
    },
    {
      id: 'class-2',
      title: 'Building Neural Networks with Keras',
      lessons: [
        { id: 'lesson-1', title: 'The Keras Sequential API' },
        { id: 'lesson-2', title: 'Building a Regression MLP' },
        { id: 'lesson-3', title: 'Building a Classification MLP' },
        { id: 'lesson-4', title: 'The Functional API for Complex Models' },
      ]
    },
    {
      id: 'class-3',
      title: 'Fine-Tuning a Neural Network',
      lessons: [
        { id: 'lesson-1', title: 'Understanding Optimizers (Adam, SGD)' },
        { id: 'lesson-2', title: 'Avoiding Overfitting: Dropout and Early Stopping' },
        { id: 'lesson-3', title: 'Saving and Loading Models' },
      ]
    }
  ]
};

const mlPyModule5: Module = {
  id: 'module-5',
  title: 'Machine Learning in Production',
  classes: [
    {
      id: 'class-1',
      title: 'Advanced Feature Engineering',
      lessons: [
        { id: 'lesson-1', title: 'Handling Missing Data' },
        { id: 'lesson-2', title: 'Encoding Categorical Features at Scale' },
        { id: 'lesson-3', title: 'Creating Interaction and Polynomial Features' },
      ]
    },
    {
      id: 'class-2',
      title: 'Building ML Pipelines',
      lessons: [
        { id: 'lesson-1', title: 'The Power of Scikit-Learn Pipelines' },
        { id: 'lesson-2', title: 'Automating Preprocessing and Training' },
        { id: 'lesson-3', title: 'Combining Preprocessing and Modeling' },
      ]
    },
    {
      id: 'class-3',
      title: 'Deploying Models as an API',
      lessons: [
        { id: 'lesson-1', title: 'Persisting Models with Joblib and Pickle' },
        { id: 'lesson-2', title: 'Introduction to Flask for Model Serving' },
        { id: 'lesson-3', title: 'Creating a Prediction Endpoint' },
      ]
    },
    {
        id: 'class-4',
        title: 'Introduction to NLP',
        lessons: [
            { id: 'lesson-1', title: 'Representing Text: Bag-of-Words and TF-IDF' },
            { id: 'lesson-2', title: 'Building a Simple Text Classifier' },
            { id: 'lesson-3', title: 'Introduction to Word Embeddings (Word2Vec)' },
        ]
    }
  ]
};

// Detailed outline for "Data Analysis with Python"
const daPyModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Data Analysis with Python',
  classes: [
    {
      id: 'class-1',
      title: 'Python for Data Analysis',
      lessons: [
        { id: 'lesson-1', title: "Setting Up Your Analysis Environment" },
        { id: 'lesson-2', title: 'Python Data Structures Review' },
        { id: 'lesson-3', title: 'Essential Control Flow' },
      ]
    },
    {
      id: 'class-2',
      title: 'Numerical Computing with NumPy',
      lessons: [
        { id: 'lesson-1', title: 'Understanding the ndarray' },
        { id: 'lesson-2', title: 'Array Indexing and Slicing' },
        { id: 'lesson-3', title: 'Computation on NumPy Arrays: UFuncs' },
        { id: 'lesson-4', title: 'Aggregations and Broadcasting' }
      ]
    },
    {
      id: 'class-3',
      title: 'Data Manipulation with Pandas',
      lessons: [
        { id: 'lesson-1', title: 'Introducing Pandas Objects: Series and DataFrame' },
        { id: 'lesson-2', title: 'Importing and Inspecting Data' },
        { id: 'lesson-3', title: 'Selection, Filtering, and Sorting' },
        { id: 'lesson-4', title: 'Grouping and Aggregation with groupby' },
      ]
    },
    {
      id: 'class-4',
      title: 'Foundational Data Visualization',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Matplotlib' },
        { id: 'lesson-2', title: 'Statistical Plots with Seaborn' },
        { id: 'lesson-3', title: 'Customizing Plots for Clarity' },
      ]
    }
  ]
};

const daPyModule2: Module = {
  id: 'module-2',
  title: 'The Art of Exploratory Data Analysis (EDA)',
  classes: [
    {
      id: 'class-1',
      title: 'The EDA Process',
      lessons: [
        { id: 'lesson-1', title: 'What is EDA and Why is it Important?' },
        { id: 'lesson-2', title: 'Formulating Questions for Your Data' },
        { id: 'lesson-3', title: 'Structuring an EDA Notebook' },
      ]
    },
    {
      id: 'class-2',
      title: 'Analyzing Single Variables (Univariate Analysis)',
      lessons: [
        { id: 'lesson-1', title: 'Summarizing Numerical Data' },
        { id: 'lesson-2', title: 'Visualizing Numerical Distributions' },
        { id: 'lesson-3', title: 'Summarizing and Visualizing Categorical Data' },
      ]
    },
    {
      id: 'class-3',
      title: 'Analyzing Relationships (Bivariate Analysis)',
      lessons: [
        { id: 'lesson-1', title: 'Numerical vs. Numerical: Scatter Plots and Correlation' },
        { id: 'lesson-2', title: 'Categorical vs. Numerical: Grouped Box Plots and Bar Charts' },
        { id: 'lesson-3', title: 'Categorical vs. Categorical: Contingency Tables and Heatmaps' },
      ]
    },
    {
      id: 'class-4',
      title: 'Multivariate Analysis',
      lessons: [
        { id: 'lesson-1', title: 'Visualizing Three or More Variables' },
        { id: 'lesson-2', title: 'Introduction to Pair Plots' },
      ]
    }
  ]
};

const daPyModule3: Module = {
  id: 'module-3',
  title: 'Advanced Data Wrangling and Preparation',
  classes: [
    {
      id: 'class-1',
      title: 'Handling Missing Data',
      lessons: [
        { id: 'lesson-1', title: 'Identifying Missing Values' },
        { id: 'lesson-2', title: 'Strategies for Deletion (Listwise, Pairwise)' },
        { id: 'lesson-3', title: 'Imputation Techniques (Mean, Median, Mode)' },
        { id: 'lesson-4', title: 'Advanced Imputation with Scikit-learn' },
      ]
    },
    {
      id: 'class-2',
      title: 'Working with Different Data Types',
      lessons: [
        { id: 'lesson-1', title: 'Manipulating Text Data with String Methods' },
        { id: 'lesson-2', title: 'Handling Categorical Data' },
        { id: 'lesson-3', title: 'Working with Datetime Objects in Pandas' },
      ]
    },
    {
      id: 'class-3',
      title: 'Combining and Reshaping Data',
      lessons: [
        { id: 'lesson-1', title: 'Merging DataFrames with merge()' },
        { id: 'lesson-2', title: 'Joining and Concatenating DataFrames' },
        { id: 'lesson-3', title: 'Reshaping with pivot_table() and melt()' },
      ]
    }
  ]
};

const daPyModule4: Module = {
  id: 'module-4',
  title: 'Statistical Inference for Data Analysis',
  classes: [
    {
      id: 'class-1',
      title: 'Foundations of Statistical Inference',
      lessons: [
        { id: 'lesson-1', title: 'Populations and Samples' },
        { id: 'lesson-2', title: 'The Central Limit Theorem in Practice' },
        { id: 'lesson-3', title: 'Confidence Intervals' },
      ]
    },
    {
      id: 'class-2',
      title: 'Hypothesis Testing',
      lessons: [
        { id: 'lesson-1', title: 'The Framework of Hypothesis Testing' },
        { id: 'lesson-2', title: 'One-Sample and Two-Sample t-tests with SciPy' },
        { id: 'lesson-3', title: 'Analysis of Variance (ANOVA)' },
        { id: 'lesson-4', title: 'Chi-Squared Test for Independence' }
      ]
    },
    {
      id: 'class-3',
      title: 'Introduction to A/B Testing',
      lessons: [
        { id: 'lesson-1', title: 'Designing an A/B Test' },
        { id: 'lesson-2', title: 'Analyzing A/B Test Results' },
        { id: 'lesson-3', title: 'Common Pitfalls and Considerations' },
      ]
    }
  ]
};

const daPyModule5: Module = {
  id: 'module-5',
  title: 'Communicating Insights and Data Storytelling',
  classes: [
    {
      id: 'class-1',
      title: 'Advanced Interactive Visualization',
      lessons: [
        { id: 'lesson-1', title: 'Getting Started with Plotly Express' },
        { id: 'lesson-2', title: 'Creating Interactive Charts and Graphs' },
        { id: 'lesson-3', title: 'Building a Simple Dashboard with Plotly Dash' },
      ]
    },
    {
      id: 'class-2',
      title: 'Principles of Effective Data Storytelling',
      lessons: [
        { id: 'lesson-1', title: 'Understanding Your Audience' },
        { id: 'lesson-2', title: 'Crafting a Narrative with Data' },
        { id: 'lesson-3', title: 'Choosing the Right Visual and Message' },
      ]
    },
    {
      id: 'class-3',
      title: 'Case Study: From Raw Data to Actionable Insights',
      lessons: [
        { id: 'lesson-1', title: 'Project Scoping and Data Collection' },
        { id: 'lesson-2', title: 'Analysis and Insight Generation' },
        { id: 'lesson-3', title: 'Presenting the Final Report' },
      ]
    }
  ]
};

// Detailed outline for "Artificial Intelligence with Python"
const aiPyModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Artificial Intelligence',
  classes: [
    {
      id: 'class-1',
      title: 'Introduction to AI',
      lessons: [
        { id: 'lesson-1', title: 'What is AI? A Brief History' },
        { id: 'lesson-2', title: 'Types of AI: Narrow, General, and Superintelligence' },
        { id: 'lesson-3', title: 'The Landscape of AI: Key Disciplines' },
      ]
    },
    {
      id: 'class-2',
      title: 'Intelligent Agents',
      lessons: [
        { id: 'lesson-1', title: 'Agents and Environments' },
        { id: 'lesson-2', title: 'Rationality and PEAS' },
        { id: 'lesson-3', title: 'Types of Agents (Simple Reflex, Model-Based, etc.)' },
      ]
    },
    {
      id: 'class-3',
      title: 'Python for AI',
      lessons: [
        { id: 'lesson-1', title: 'Core Libraries for AI (NumPy, SciPy)' },
        { id: 'lesson-2', title: 'Representing Problems and States' },
      ]
    }
  ]
};

const aiPyModule2: Module = {
  id: 'module-2',
  title: 'Solving Problems with Search',
  classes: [
    {
      id: 'class-1',
      title: 'Uninformed Search Algorithms',
      lessons: [
        { id: 'lesson-1', title: 'Problem-Solving Agents' },
        { id: 'lesson-2', title: 'Breadth-First Search (BFS)' },
        { id: 'lesson-3', title: 'Depth-First Search (DFS)' },
        { id: 'lesson-4', title: 'Uniform-Cost Search' }
      ]
    },
    {
      id: 'class-2',
      title: 'Informed (Heuristic) Search Algorithms',
      lessons: [
        { id: 'lesson-1', title: 'The Concept of Heuristics' },
        { id: 'lesson-2', title: 'Greedy Best-First Search' },
        { id: 'lesson-3', title: 'A* Search: The Gold Standard' },
      ]
    },
    {
      id: 'class-3',
      title: 'Adversarial Search for Games',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Game Theory and Search' },
        { id: 'lesson-2', title: 'The Minimax Algorithm' },
        { id: 'lesson-3', title: 'Alpha-Beta Pruning for Optimization' },
      ]
    }
  ]
};

const aiPyModule3: Module = {
  id: 'module-3',
  title: 'Knowledge Representation and Reasoning',
  classes: [
    {
      id: 'class-1',
      title: 'Logical Agents',
      lessons: [
        { id: 'lesson-1', title: 'Knowledge-Based Agents' },
        { id: 'lesson-2', title: 'Propositional Logic' },
        { id: 'lesson-3', title: 'Inference with Propositional Logic' },
      ]
    },
    {
      id: 'class-2',
      title: 'First-Order Logic',
      lessons: [
        { id: 'lesson-1', title: 'Syntax and Semantics of First-Order Logic' },
        { id: 'lesson-2', title: 'Using First-Order Logic' },
        { id: 'lesson-3', title: 'Inference in First-Order Logic' },
      ]
    },
    {
      id: 'class-3',
      title: 'Introduction to Planning',
      lessons: [
        { id: 'lesson-1', title: 'What is Automated Planning?' },
        { id: 'lesson-2', title: 'Representing Planning Problems (STRIPS)' },
        { id: 'lesson-3', title: 'Forward and Backward State-Space Search' },
      ]
    }
  ]
};

const aiPyModule4: Module = {
  id: 'module-4',
  title: 'Fundamentals of Natural Language Processing',
  classes: [
    {
      id: 'class-1',
      title: 'Processing and Understanding Text',
      lessons: [
        { id: 'lesson-1', title: 'Text Preprocessing: Tokenization, Stop Words, Stemming' },
        { id: 'lesson-2', title: 'Feature Extraction: Bag-of-Words and TF-IDF' },
        { id: 'lesson-3', title: 'Building a Text Classifier with Scikit-Learn' },
      ]
    },
    {
      id: 'class-2',
      title: 'Topic Modeling',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Topic Modeling' },
        { id: 'lesson-2', title: 'Latent Dirichlet Allocation (LDA)' },
        { id: 'lesson-3', title: 'Implementing LDA with Gensim' },
      ]
    },
    {
      id: 'class-3',
      title: 'Introduction to Modern NLP',
      lessons: [
        { id: 'lesson-1', title: 'From Word Embeddings to Transformers' },
        { id: 'lesson-2', title: 'Using Pre-trained Models with Hugging Face' },
        { id: 'lesson-3', title: 'Performing Sentiment Analysis with Transformers' },
      ]
    }
  ]
};

const aiPyModule5: Module = {
  id: 'module-5',
  title: 'Introduction to Computer Vision',
  classes: [
    {
      id: 'class-1',
      title: 'Image Processing Fundamentals',
      lessons: [
        { id: 'lesson-1', title: 'Reading and Displaying Images with OpenCV' },
        { id: 'lesson-2', title: 'Color Spaces and Image Transformations' },
        { id: 'lesson-3', title: 'Thresholding, Blurring, and Edge Detection' },
      ]
    },
    {
      id: 'class-2',
      title: 'Image Classification with Deep Learning',
      lessons: [
        { id: 'lesson-1', title: 'What is a Convolutional Neural Network (CNN)?' },
        { id: 'lesson-2', title: 'Building a CNN for Image Classification with Keras' },
        { id: 'lesson-3', title: 'Understanding Transfer Learning' },
        { id: 'lesson-4', title: 'Using a Pre-trained CNN for Classification' }
      ]
    },
    {
      id: 'class-3',
      title: 'Object Detection',
      lessons: [
        { id: 'lesson-1', title: 'The Object Detection Task' },
        { id: 'lesson-2', title: 'Overview of Popular Architectures (e.g., YOLO)' },
        { id: 'lesson-3', title: 'Implementing Object Detection with a Pre-trained Model' },
      ]
    }
  ]
};

// --- NEW PYTHON COURSE: Deep Learning ---
const dlPyModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Neural Networks',
  classes: [
    { id: 'class-1', title: 'Introduction to Deep Learning', lessons: [ { id: 'lesson-1', title: 'What is Deep Learning?' }, { id: 'lesson-2', title: 'The Perceptron and Multi-Layer Perceptrons' }, { id: 'lesson-3', title: 'Activation Functions' }, { id: 'lesson-4', title: 'Backpropagation and Gradient Descent' } ] },
    { id: 'class-2', title: 'Building Models with Keras and TensorFlow', lessons: [ { id: 'lesson-1', title: 'Introduction to TensorFlow and Keras' }, { id: 'lesson-2', title: 'Building a Sequential Model' }, { id: 'lesson-3', title: 'Compiling and Training Models' }, { id: 'lesson-4', title: 'Saving and Loading Models' } ] },
    { id: 'class-3', title: 'Improving Model Performance', lessons: [ { id: 'lesson-1', title: 'Understanding Overfitting and Underfitting' }, { id: 'lesson-2', title: 'Regularization Techniques (L1, L2, Dropout)' }, { id: 'lesson-3', title: 'Optimizers and Learning Rate Schedules' }, { id: 'lesson-4', title: 'Callbacks and Early Stopping' } ] }
  ]
};
const dlPyModule2: Module = {
  id: 'module-2',
  title: 'Computer Vision with CNNs',
  classes: [
    { id: 'class-1', title: 'Introduction to Convolutional Neural Networks', lessons: [ { id: 'lesson-1', title: 'The Convolution Operation' }, { id: 'lesson-2', title: 'Pooling and Strides' }, { id: 'lesson-3', title: 'Building a Basic CNN' } ] },
    { id: 'class-2', title: 'Advanced CNN Architectures', lessons: [ { id: 'lesson-1', title: 'Classic Architectures (LeNet, AlexNet, VGG)' }, { id: 'lesson-2', title: 'Modern Architectures (ResNet, Inception)' } ] },
    { id: 'class-3', title: 'Practical Applications of CNNs', lessons: [ { id: 'lesson-1', title: 'Image Classification' }, { id: 'lesson-2', title: 'Transfer Learning for Vision' }, { id: 'lesson-3', title: 'Data Augmentation Techniques' } ] }
  ]
};
const dlPyModule3: Module = {
  id: 'module-3',
  title: 'Sequence Data with RNNs & LSTMs',
  classes: [
    { id: 'class-1', title: 'Introduction to Recurrent Neural Networks', lessons: [ { id: 'lesson-1', title: 'Handling Sequential Data' }, { id: 'lesson-2', title: 'The Structure of an RNN' }, { id: 'lesson-3', title: 'The Vanishing Gradient Problem' } ] },
    { id: 'class-2', title: 'Long Short-Term Memory (LSTM) and GRUs', lessons: [ { id: 'lesson-1', title: 'The LSTM Cell' }, { id: 'lesson-2', title: 'Gated Recurrent Units (GRUs)' }, { id: 'lesson-3', title: 'Building LSTMs with Keras' } ] },
    { id: 'class-3', title: 'Applications in Natural Language Processing', lessons: [ { id: 'lesson-1', title: 'Text Preprocessing and Embeddings' }, { id: 'lesson-2', title: 'Sentiment Analysis with LSTMs' }, { id: 'lesson-3', title: 'Introduction to Text Generation' } ] }
  ]
};
const dlPyModule4: Module = {
  id: 'module-4',
  title: 'Modern Architectures: Transformers & Attention',
  classes: [
    { id: 'class-1', title: 'The Attention Mechanism', lessons: [ { id: 'lesson-1', title: 'Limitations of RNNs' }, { id: 'lesson-2', title: 'Attention in Sequence-to-Sequence Models' } ] },
    { id: 'class-2', title: 'The Transformer Architecture', lessons: [ { id: 'lesson-1', title: 'Self-Attention' }, { id: 'lesson-2', title: 'Positional Encodings' }, { id: 'lesson-3', title: 'The Encoder-Decoder Stack' } ] },
    { id: 'class-3', title: 'Applying Transformers with Hugging Face', lessons: [ { id: 'lesson-1', title: 'Introduction to the Hugging Face Ecosystem' }, { id: 'lesson-2', title: 'Fine-Tuning a Pre-trained Transformer' } ] }
  ]
};
const dlPyModule5: Module = {
  id: 'module-5',
  title: 'Generative AI and Deployment',
  classes: [
    { id: 'class-1', title: 'Generative Adversarial Networks (GANs)', lessons: [ { id: 'lesson-1', title: 'The Generator and Discriminator' }, { id: 'lesson-2', title: 'Training a Simple GAN' } ] },
    { id: 'class-2', title: 'Autoencoders', lessons: [ { id: 'lesson-1', title: 'Denoising and Variational Autoencoders' } ] },
    { id: 'class-3', title: 'Deploying Deep Learning Models', lessons: [ { id: 'lesson-1', title: 'Saving Models for Production' }, { id: 'lesson-2', title: 'Introduction to TensorFlow Serving' } ] }
  ]
};

// --- R COURSES ---

// Data Science with R
const dsRModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Data Science with R',
  classes: [
    {
      id: 'class-1', title: 'The R Tidyverse Ecosystem',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to R and RStudio' },
        { id: 'lesson-2', title: 'Data Frames and Tibbles' },
        { id: 'lesson-3', title: 'The Pipe Operator (%>%)' },
      ]
    },
    {
      id: 'class-2', title: 'Data Manipulation with dplyr',
      lessons: [
        { id: 'lesson-1', title: 'Selecting and Filtering Data' },
        { id: 'lesson-2', title: 'Creating and Modifying Columns' },
        { id: 'lesson-3', title: 'Summarizing and Grouping Data' },
      ]
    },
    {
      id: 'class-3', title: 'Data Visualization with ggplot2',
      lessons: [
        { id: 'lesson-1', title: 'The Grammar of Graphics' },
        { id: 'lesson-2', title: 'Common Geoms: Points, Lines, Bars' },
        { id: 'lesson-3', title: 'Aesthetics, Scales, and Facets' },
      ]
    },
    {
      id: 'class-4', title: 'Data Import and Tidying',
      lessons: [
        { id: 'lesson-1', title: 'Reading Data with readr' },
        { id: 'lesson-2', title: 'Tidying Data with tidyr' },
        { id: 'lesson-3', title: 'Introduction to R Markdown' },
      ]
    }
  ]
};

const dsRModule2: Module = {
  id: 'module-2',
  title: 'Machine Learning Foundations with R',
  classes: [
    {
      id: 'class-1', title: 'Introduction to Machine Learning',
      lessons: [
        { id: 'lesson-1', title: 'Core Concepts of ML' },
        { id: 'lesson-2', title: 'The caret Package Workflow' },
        { id: 'lesson-3', title: 'Splitting Data and Preprocessing' },
      ]
    },
    {
      id: 'class-2', title: 'Regression Models',
      lessons: [
        { id: 'lesson-1', title: 'Simple and Multiple Linear Regression' },
        { id: 'lesson-2', title: 'Training with caret' },
        { id: 'lesson-3', title: 'Evaluating Regression Models' },
      ]
    },
    {
      id: 'class-3', title: 'Classification Models',
      lessons: [
        { id: 'lesson-1', title: 'Logistic Regression' },
        { id: 'lesson-2', title: 'K-Nearest Neighbors (KNN)' },
        { id: 'lesson-3', title: 'Evaluating Classification Models' },
      ]
    }
  ]
};

const dsRModule3: Module = {
  id: 'module-3',
  title: 'Advanced Data Wrangling with R',
  classes: [
    {
      id: 'class-1', title: 'Relational Data with dplyr',
      lessons: [
        { id: 'lesson-1', title: 'Mutating Joins (left, right, inner)' },
        { id: 'lesson-2', title: 'Filtering Joins (semi, anti)' },
        { id: 'lesson-3', title: 'Working with Multiple Tables' },
      ]
    },
    {
      id: 'class-2', title: 'Working with Strings using stringr',
      lessons: [
        { id: 'lesson-1', title: 'Detecting and Subsetting Patterns' },
        { id: 'lesson-2', title: 'Introduction to Regular Expressions' },
        { id: 'lesson-3', title: 'Managing String Length and Padding' },
      ]
    },
    {
      id: 'class-3', title: 'Functional Programming with purrr',
      lessons: [
        { id: 'lesson-1', title: 'Replacing Loops with map()' },
        { id: 'lesson-2', title: 'Working with List-Columns' },
        { id: 'lesson-3', title: 'Handling Errors and Side Effects' },
      ]
    }
  ]
};

const dsRModule4: Module = {
  id: 'module-4',
  title: 'Supervised Learning in Depth with R',
  classes: [
    {
      id: 'class-1', title: 'Decision Trees and Random Forests',
      lessons: [
        { id: 'lesson-1', title: 'Understanding Decision Trees' },
        { id: 'lesson-2', title: 'Bagging and Random Forests' },
        { id: 'lesson-3', title: 'Feature Importance' },
      ]
    },
    {
      id: 'class-2', title: 'Gradient Boosting Machines',
      lessons: [
        { id: 'lesson-1', title: 'The Concept of Boosting' },
        { id: 'lesson-2', title: 'Implementing XGBoost with caret' },
        { id: 'lesson-3', title: 'Hyperparameter Tuning with Grid Search' },
      ]
    },
    {
      id: 'class-3', title: 'Cross-Validation and Model Selection',
      lessons: [
        { id: 'lesson-1', title: 'The Bias-Variance Tradeoff' },
        { id: 'lesson-2', title: 'K-Fold Cross-Validation in caret' },
        { id: 'lesson-3', title: 'Comparing Models' },
      ]
    }
  ]
};

const dsRModule5: Module = {
  id: 'module-5',
  title: 'Unsupervised Learning and Communication',
  classes: [
    {
      id: 'class-1', title: 'Clustering',
      lessons: [
        { id: 'lesson-1', title: 'K-Means Clustering' },
        { id: 'lesson-2', title: 'Hierarchical Clustering' },
        { id: 'lesson-3', title: 'Interpreting Clusters' },
      ]
    },
    {
      id: 'class-2', title: 'Dimensionality Reduction',
      lessons: [
        { id: 'lesson-1', title: 'Principal Component Analysis (PCA)' },
        { id: 'lesson-2', title: 'Applying PCA for Visualization' },
      ]
    },
    {
      id: 'class-3', title: 'Communicating Results with Shiny',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Shiny Apps' },
        { id: 'lesson-2', title: 'Building a Simple Dashboard' },
        { id: 'lesson-3', title: 'Reactivity Essentials' },
      ]
    }
  ]
};

// Data Analysis with R
const daRModule1: Module = {
    id: 'module-1',
    title: 'Data Analysis Fundamentals with R',
    classes: [
        {
            id: 'class-1',
            title: 'R Programming Fundamentals',
            lessons: [
                { id: 'lesson-1', title: 'Your R Environment' },
                { id: 'lesson-2', title: "R's Atomic Vectors and Data Types" },
                { id: 'lesson-3', title: 'Complex Data Structures' },
                { id: 'lesson-4', title: 'Programming Constructs' }
            ]
        },
        {
            id: 'class-2',
            title: 'Data Wrangling with the Tidyverse',
            lessons: [
                { id: 'lesson-1', title: 'The Tidyverse Ecosystem' },
                { id: 'lesson-2', title: 'Importing and Exporting Data' },
                { id: 'lesson-3', title: 'The Five Core dplyr Verbs' },
                { id: 'lesson-4', title: 'Reshaping Data for Analysis' },
                { id: 'lesson-5', title: 'Data Cleaning Essentials' }
            ]
        },
        {
            id: 'class-3',
            title: 'Exploratory Data Analysis (EDA) and Statistics',
            lessons: [
                { id: 'lesson-1', title: 'The EDA Mindset' },
                { id: 'lesson-2', title: 'Descriptive Statistics in R' },
                { id: 'lesson-3', title: 'The Split-Apply-Combine Strategy' },
                { id: 'lesson-4', title: 'Introduction to Inferential Statistics' }
            ]
        },
        {
            id: 'class-4',
            title: 'Data Visualization with ggplot2',
            lessons: [
                { id: 'lesson-1', title: 'The Grammar of Graphics' },
                { id: 'lesson-2', title: 'Building Your First Plot' },
                { id: 'lesson-3', title: 'Visualizing Distributions and Relationships' },
                { id: 'lesson-4', title: 'Polishing Your Plots' }
            ]
        }
    ]
};

const daRModule2: Module = {
  id: 'module-2',
  title: 'The Art of Exploratory Data Analysis (EDA) with R',
  classes: [
    {
      id: 'class-1', title: 'The EDA Process',
      lessons: [
        { id: 'lesson-1', title: 'Structuring an EDA in R Markdown' },
        { id: 'lesson-2', title: 'Formulating Questions for Data' },
      ]
    },
    {
      id: 'class-2', title: 'Univariate Analysis',
      lessons: [
        { id: 'lesson-1', title: 'Visualizing Numerical Distributions' },
        { id: 'lesson-2', title: 'Visualizing Categorical Data' },
      ]
    },
    {
      id: 'class-3', title: 'Bivariate and Multivariate Analysis',
      lessons: [
        { id: 'lesson-1', title: 'Correlation and Scatter Plots' },
        { id: 'lesson-2', title: 'Exploring Relationships with Facets' },
        { id: 'lesson-3', title: 'Visualizing Three or More Variables' },
      ]
    }
  ]
};

const daRModule3: Module = {
  id: 'module-3',
  title: 'Advanced Data Wrangling and Preparation with R',
  classes: [
    {
      id: 'class-1', title: 'Combining Datasets',
      lessons: [
        { id: 'lesson-1', title: 'Joining Tables with dplyr' },
        { id: 'lesson-2', title: 'Binding Rows and Columns' },
      ]
    },
    {
      id: 'class-2', title: 'Handling Missing Data',
      lessons: [
        { id: 'lesson-1', title: 'Visualizing Missing Data with naniar' },
        { id: 'lesson-2', title: 'Strategies for Imputation' },
      ]
    },
    {
      id: 'class-3', title: 'Working with Dates and Times using lubridate',
      lessons: [
        { id: 'lesson-1', title: 'Parsing Dates and Times' },
        { id: 'lesson-2', title: 'Time Spans and Arithmetic' },
      ]
    }
  ]
};

const daRModule4: Module = {
  id: 'module-4',
  title: 'Statistical Inference for Data Analysis with R',
  classes: [
    {
      id: 'class-1', title: 'Foundations of Statistical Inference',
      lessons: [
        { id: 'lesson-1', title: 'Populations and Samples in R' },
        { id: 'lesson-2', title: 'Simulating the Central Limit Theorem' },
        { id: 'lesson-3', title: 'Calculating Confidence Intervals' },
      ]
    },
    {
      id: 'class-2', title: 'Hypothesis Testing in R',
      lessons: [
        { id: 'lesson-1', title: 'Performing t-tests' },
        { id: 'lesson-2', title: 'Analysis of Variance (ANOVA)' },
        { id: 'lesson-3', title: 'Chi-Squared Tests' },
      ]
    },
    {
      id: 'class-3', title: 'Introduction to A/B Testing',
      lessons: [
        { id: 'lesson-1', title: 'Designing an A/B Test in R' },
        { id: 'lesson-2', title: 'Analyzing A/B Test Results' },
      ]
    }
  ]
};

const daRModule5: Module = {
  id: 'module-5',
  title: 'Communicating Insights and Data Storytelling with R',
  classes: [
    {
      id: 'class-1', title: 'Advanced and Interactive Visualization',
      lessons: [
        { id: 'lesson-1', title: 'Customizing ggplot2 Themes and Scales' },
        { id: 'lesson-2', title: 'Creating Interactive Plots with plotly' },
      ]
    },
    {
      id: 'class-2', title: 'Automated Reporting with R Markdown',
      lessons: [
        { id: 'lesson-1', title: 'Parameterized Reports' },
        { id: 'lesson-2', title: 'Styling with CSS and Templates' },
      ]
    },
    {
      id: 'class-3', title: 'Building Interactive Dashboards with Shiny',
      lessons: [
        { id: 'lesson-1', title: 'Shiny UI and Server Logic' },
        { id: 'lesson-2', title: 'Adding Inputs and Outputs' },
        { id: 'lesson-3', title: 'Reactive Programming' },
      ]
    }
  ]
};

// Machine Learning with R
const mlRModule1: Module = {
  id: 'module-1',
  title: 'Foundations of Machine Learning with R',
  classes: [
    {
      id: 'class-1', title: 'The Machine Learning Landscape',
      lessons: [
        { id: 'lesson-1', title: 'Core Terminology & Concepts' },
        { id: 'lesson-2', title: 'The ML Project Workflow in R' },
        { id: 'lesson-3', title: 'Introduction to the tidymodels Framework' }
      ]
    },
    {
      id: 'class-2', title: 'Linear Models for Regression',
      lessons: [
        { id: 'lesson-1', title: 'Simple and Multiple Linear Regression' },
        { id: 'lesson-2', title: 'Building Models with parsnip' },
        { id: 'lesson-3', title: 'Evaluating Performance with yardstick' }
      ]
    },
    {
      id: 'class-3', title: 'Linear Models for Classification',
      lessons: [
        { id: 'lesson-1', title: 'Logistic Regression' },
        { id: 'lesson-2', title: 'Evaluating Classification Models' },
      ]
    },
    {
      id: 'class-4', title: 'Data Preprocessing and Feature Engineering',
      lessons: [
        { id: 'lesson-1', title: 'Data Splitting with rsample' },
        { id: 'lesson-2', title: 'Feature Engineering with recipes' },
        { id: 'lesson-3', title: 'Creating Reusable Workflows' }
      ]
    }
  ]
};

const mlRModule2: Module = {
  id: 'module-2',
  title: 'Advanced Supervised Learning with R',
  classes: [
    {
      id: 'class-1', title: 'Tree-Based Methods',
      lessons: [
        { id: 'lesson-1', title: 'Decision Trees' },
        { id: 'lesson-2', title: 'Bagging and Random Forests' },
        { id: 'lesson-3', title: 'Gradient Boosting with xgboost' },
      ]
    },
    {
      id: 'class-2', title: 'Support Vector Machines (SVMs)',
      lessons: [
        { id: 'lesson-1', title: 'Maximal Margin Classification' },
        { id: 'lesson-2', title: 'The Kernel Trick' },
      ]
    },
    {
      id: 'class-3', title: 'Hyperparameter Tuning',
      lessons: [
        { id: 'lesson-1', title: 'Cross-Validation for Resampling' },
        { id: 'lesson-2', title: 'Tuning Models with tune' },
        { id: 'lesson-3', title: 'Grid Search and Bayesian Optimization' },
      ]
    }
  ]
};

const mlRModule3: Module = {
  id: 'module-3',
  title: 'Unsupervised Learning with R',
  classes: [
    {
      id: 'class-1', title: 'Clustering Algorithms',
      lessons: [
        { id: 'lesson-1', title: 'K-Means Clustering' },
        { id: 'lesson-2', title: 'Hierarchical Clustering' },
        { id: 'lesson-3', title: 'DBSCAN: Density-Based Clustering' },
      ]
    },
    {
      id: 'class-2', title: 'Dimensionality Reduction',
      lessons: [
        { id: 'lesson-1', title: 'Principal Component Analysis (PCA)' },
        { id: 'lesson-2', title: 't-SNE for Visualization' },
      ]
    }
  ]
};

const mlRModule4: Module = {
  id: 'module-4',
  title: 'Introduction to Deep Learning with R',
  classes: [
    {
      id: 'class-1', title: 'Artificial Neural Networks',
      lessons: [
        { id: 'lesson-1', title: 'The Perceptron' },
        { id: 'lesson-2', title: 'Multi-Layer Perceptrons' },
      ]
    },
    {
      id: 'class-2', title: 'Building Neural Networks with Keras',
      lessons: [
        { id: 'lesson-1', title: 'The Keras Sequential API in R' },
        { id: 'lesson-2', title: 'Building a Regression MLP' },
        { id: 'lesson-3', title: 'Building a Classification MLP' },
      ]
    },
    {
      id: 'class-3', title: 'Convolutional Neural Networks (CNNs)',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to CNNs' },
        { id: 'lesson-2', title: 'Building a CNN for Image Classification' },
      ]
    }
  ]
};

const mlRModule5: Module = {
  id: 'module-5',
  title: 'Machine Learning in Production with R',
  classes: [
    {
      id: 'class-1', title: 'Advanced Feature Engineering',
      lessons: [
        { id: 'lesson-1', title: 'Advanced recipe Steps' },
        { id: 'lesson-2', title: 'Text Processing for ML' },
        { id: 'lesson-3', title: 'Handling Imbalanced Data' },
      ]
    },
    {
      id: 'class-2', title: 'Model Interpretability',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Explainable AI (XAI)' },
        { id: 'lesson-2', title: 'LIME and SHAP' },
      ]
    },
    {
      id: 'class-3', title: 'Deploying Models as an API with plumber',
      lessons: [
        { id: 'lesson-1', title: 'Saving and Loading Models' },
        { id: 'lesson-2', title: 'Creating API Endpoints with plumber' },
        { id: 'lesson-3', title: 'Containerizing with Docker' },
      ]
    }
  ]
};

// --- NEW R COURSE: Time Series Analysis ---
const tsRModule1: Module = {
  id: 'module-1',
  title: 'Introduction to Time Series Data with R',
  classes: [
    { id: 'class-1', title: 'Working with Time Series Objects', lessons: [ { id: 'lesson-1', title: 'Characteristics of Time Series Data' }, { id: 'lesson-2', title: 'The tsibble and ts objects' }, { id: 'lesson-3', title: 'Visualizing Time Series with feasts' } ] },
    { id: 'class-2', title: 'Time Series Components', lessons: [ { id: 'lesson-1', title: 'Trend, Seasonality, and Cycles' }, { id: 'lesson-2', title: 'Autocorrelation (ACF) and Partial Autocorrelation (PACF)' }, { id: 'lesson-3', title: 'White Noise and Stationarity' } ] }
  ]
};
const tsRModule2: Module = {
  id: 'module-2',
  title: 'Time Series Smoothing and Decomposition',
  classes: [
    { id: 'class-1', title: 'Smoothing Methods', lessons: [ { id: 'lesson-1', title: 'Simple Moving Averages' }, { id: 'lesson-2', title: 'Exponential Smoothing (SES, Holt, Holt-Winters)' } ] },
    { id: 'class-2', title: 'Decomposition', lessons: [ { id: 'lesson-1', title: 'Classical Decomposition (Additive and Multiplicative)' }, { id: 'lesson-2', title: 'STL Decomposition' } ] }
  ]
};
const tsRModule3: Module = {
  id: 'module-3',
  title: 'ARIMA Modeling',
  classes: [
    { id: 'class-1', title: 'Autoregressive (AR) and Moving Average (MA) Models', lessons: [ { id: 'lesson-1', title: 'Understanding AR(p) Models' }, { id: 'lesson-2', title: 'Understanding MA(q) Models' } ] },
    { id: 'class-2', title: 'Building ARIMA Models', lessons: [ { id: 'lesson-1', title: 'Differencing for Stationarity' }, { id: 'lesson-2', title: 'The ARIMA(p,d,q) Model' }, { id: 'lesson-3', title: 'Model Identification with ACF/PACF' }, { id: 'lesson-4', title: 'Automated ARIMA with `auto.arima`' } ] }
  ]
};
const tsRModule4: Module = {
  id: 'module-4',
  title: 'Advanced Forecasting Models',
  classes: [
    { id: 'class-1', title: 'Modern Forecasting with Prophet', lessons: [ { id: 'lesson-1', title: 'Introduction to Facebook Prophet' }, { id: 'lesson-2', title: 'Fitting and Forecasting with Prophet' } ] },
    { id: 'class-2', title: 'Dynamic Regression Models', lessons: [ { id: 'lesson-1', title: 'Including External Regressors' } ] },
    { id: 'class-3', title: 'Introduction to GARCH models for Volatility', lessons: [ { id: 'lesson-1', title: 'Modeling Volatility' } ] }
  ]
};
const tsRModule5: Module = {
  id: 'module-5',
  title: 'Evaluating and Communicating Forecasts',
  classes: [
    { id: 'class-1', title: 'Evaluating Forecast Accuracy', lessons: [ { id: 'lesson-1', title: 'Forecast Error Metrics (MAPE, RMSE)' }, { id: 'lesson-2', title: 'Training and Test Sets for Time Series' }, { id: 'lesson-3', title: 'Residual Diagnostics' } ] },
    { id: 'class-2', title: 'Communicating Results', lessons: [ { id: 'lesson-1', title: 'Visualizing Forecasts with Confidence Intervals' }, { id: 'lesson-2', title: 'Building a Forecasting Report' } ] }
  ]
};

// --- SQL COURSES ---
const sqlModule1: Module = {
  id: 'module-1',
  title: 'SQL Fundamentals',
  classes: [
    {
      id: 'class-1',
      title: 'Introduction to Databases and SQL',
      lessons: [
        { id: 'lesson-1', title: 'What is a Relational Database?' },
        { id: 'lesson-2', title: 'Your First Queries: SELECT and FROM' },
        { id: 'lesson-3', title: 'Filtering Data with WHERE' },
      ]
    },
    {
      id: 'class-2',
      title: 'Sorting and Limiting Results',
      lessons: [
        { id: 'lesson-1', title: 'Ordering Results with ORDER BY' },
        { id: 'lesson-2', title: 'Limiting Results with LIMIT' },
        { id: 'lesson-3', title: 'Combining Filtering and Sorting' },
      ]
    },
    {
      id: 'class-3',
      title: 'Basic Data Types and Operators',
      lessons: [
        { id: 'lesson-1', title: 'Common SQL Data Types (INT, VARCHAR, DATE)' },
        { id: 'lesson-2', title: 'Working with NULLs' },
        { id: 'lesson-3', title: 'Logical Operators (AND, OR, NOT, BETWEEN)' },
      ]
    }
  ]
};

const sqlModule2: Module = {
  id: 'module-2',
  title: 'Aggregating and Grouping Data',
  classes: [
    {
      id: 'class-1',
      title: 'Aggregate Functions',
      lessons: [
        { id: 'lesson-1', title: 'Counting Rows with COUNT()' },
        { id: 'lesson-2', title: 'Calculating with SUM(), AVG(), MIN(), MAX()' },
      ]
    },
    {
      id: 'class-2',
      title: 'Grouping Data',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to GROUP BY' },
        { id: 'lesson-2', title: 'Filtering Groups with HAVING' },
        { id: 'lesson-3', title: 'The Order of Execution' },
      ]
    },
    {
      id: 'class-3',
      title: 'Case Statements',
      lessons: [
        { id: 'lesson-1', title: 'Conditional Logic with CASE WHEN' },
        { id: 'lesson-2', title: 'Creating Categories with CASE' },
      ]
    }
  ]
};

const sqlModule3: Module = {
  id: 'module-3',
  title: 'Joining Multiple Tables',
  classes: [
    {
      id: 'class-1',
      title: 'Introduction to Joins',
      lessons: [
        { id: 'lesson-1', title: 'Primary and Foreign Keys' },
        { id: 'lesson-2', title: 'The Inner Join' },
      ]
    },
    {
      id: 'class-2',
      title: 'Outer Joins',
      lessons: [
        { id: 'lesson-1', title: 'LEFT JOIN and RIGHT JOIN' },
        { id: 'lesson-2', title: 'Understanding NULLs in Joins' },
        { id: 'lesson-3', title: 'FULL OUTER JOIN' },
      ]
    },
    {
      id: 'class-3',
      title: 'Advanced Joins',
      lessons: [
        { id: 'lesson-1', title: 'Joining Multiple Tables' },
        { id: 'lesson-2', title: 'Self Joins' },
        { id: 'lesson-3', title: 'Using Aliases with Joins' },
      ]
    }
  ]
};

const sqlModule4: Module = {
  id: 'module-4',
  title: 'Subqueries and CTEs',
  classes: [
    {
      id: 'class-1',
      title: 'Subqueries',
      lessons: [
        { id: 'lesson-1', title: 'Subqueries in the WHERE Clause' },
        { id: 'lesson-2', title: 'Subqueries in the FROM Clause' },
        { id: 'lesson-3', title: 'Correlated Subqueries' },
      ]
    },
    {
      id: 'class-2',
      title: 'Common Table Expressions (CTEs)',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to CTEs with WITH' },
        { id: 'lesson-2', title: 'Organizing Complex Queries' },
        { id: 'lesson-3', title: 'Brief Intro to Recursive CTEs' },
      ]
    }
  ]
};

const sqlModule5: Module = {
  id: 'module-5',
  title: 'Advanced SQL for Data Analysis',
  classes: [
    {
      id: 'class-1',
      title: 'Window Functions',
      lessons: [
        { id: 'lesson-1', title: 'Introduction to Window Functions' },
        { id: 'lesson-2', title: 'Ranking Functions (ROW_NUMBER, RANK)' },
        { id: 'lesson-3', title: 'Aggregate Window Functions' },
        { id: 'lesson-4', title: 'Running Totals and Moving Averages' },
      ]
    },
    {
      id: 'class-2',
      title: 'Working with Text and Dates',
      lessons: [
        { id: 'lesson-1', title: 'Common String Functions' },
        { id: 'lesson-2', title: 'Manipulating Dates' },
      ]
    },
    {
      id: 'class-3',
      title: 'Performance and Optimization',
      lessons: [
        { id: 'lesson-1', title: 'Understanding Indexes' },
        { id: 'lesson-2', title: 'Writing Efficient Queries' },
      ]
    }
  ]
};

// --- NEW SQL COURSE: SQL for Business Intelligence ---
const biSqlModule1: Module = {
  id: 'module-1',
  title: 'BI Fundamentals and Advanced SQL Review',
  classes: [
    { id: 'class-1', title: 'The Role of SQL in BI', lessons: [ { id: 'lesson-1', title: 'What is Business Intelligence?' }, { id: 'lesson-2', title: 'From Data to Decisions' }, { id: 'lesson-3', title: 'The Modern BI Stack' } ] },
    { id: 'class-2', title: 'Advanced SQL Refresher', lessons: [ { id: 'lesson-1', title: 'Mastering Joins and Subqueries' }, { id: 'lesson-2', title: 'Leveraging CTEs for Readability' }, { id: 'lesson-3', title: 'Unlocking Window Functions' } ] }
  ]
};
const biSqlModule2: Module = {
  id: 'module-2',
  title: 'Calculating Business Metrics with SQL',
  classes: [
    { id: 'class-1', title: 'Core E-commerce Metrics', lessons: [ { id: 'lesson-1', title: 'Daily/Monthly Active Users (DAU/MAU)' }, { id: 'lesson-2', title: 'Average Revenue Per User (ARPU)' }, { id: 'lesson-3', title: 'Conversion Rates' } ] },
    { id: 'class-2', title: 'Subscription and SaaS Metrics', lessons: [ { id: 'lesson-1', title: 'Monthly Recurring Revenue (MRR)' }, { id: 'lesson-2', title: 'Churn Rate' }, { id: 'lesson-3', title: 'Customer Lifetime Value (CLV)' } ] }
  ]
};
const biSqlModule3: Module = {
  id: 'module-3',
  title: 'Customer Analytics with SQL',
  classes: [
    { id: 'class-1', title: 'Customer Segmentation', lessons: [ { id: 'lesson-1', title: 'RFM Analysis (Recency, Frequency, Monetary)' } ] },
    { id: 'class-2', title: 'Cohort Analysis', lessons: [ { id: 'lesson-1', title: 'Defining Cohorts' }, { id: 'lesson-2', title: 'Calculating Retention Rates' }, { id: 'lesson-3', title: 'Visualizing Cohort Grids' } ] }
  ]
};
const biSqlModule4: Module = {
  id: 'module-4',
  title: 'Funnel Analysis and A/B Testing',
  classes: [
    { id: 'class-1', title: 'User Funnel Analysis', lessons: [ { id: 'lesson-1', title: 'Defining Funnel Steps' }, { id: 'lesson-2', title: 'Calculating Step-over-Step Conversion' } ] },
    { id: 'class-2', title: 'Analyzing A/B Tests with SQL', lessons: [ { id: 'lesson-1', title: 'Calculating Lift and Significance' } ] }
  ]
};
const biSqlModule5: Module = {
  id: 'module-5',
  title: 'Data Modeling and Dashboarding',
  classes: [
    { id: 'class-1', title: 'Introduction to Data Modeling', lessons: [ { id: 'lesson-1', title: 'Star Schema vs. Snowflake Schema' }, { id: 'lesson-2', title: 'Fact and Dimension Tables' } ] },
    { id: 'class-2', title: 'Building Queries for Dashboards', lessons: [ { id: 'lesson-1', title: 'Aggregating Data for Time Series Plots' }, { id: 'lesson-2', title: 'Creating Summary Tables' } ] }
  ]
};

// --- SCALA COURSES ---
const dsScalaModule1: Module = {
    id: 'module-1',
    title: 'Foundations of Data Science with Scala',
    classes: [
        {
            id: 'class-1',
            title: 'Scala Fundamentals for Data Science',
            lessons: [
                { id: 'lesson-1', title: 'Setting Up Your Scala Environment' },
                { id: 'lesson-2', title: 'Variables, Types, and Control Structures' },
                { id: 'lesson-3', title: 'Collections and Functional Programming' },
                { id: 'lesson-4', title: 'Case Classes and Pattern Matching' },
            ]
        },
        {
            id: 'class-2',
            title: 'Introduction to sbt and Libraries',
            lessons: [
                { id: 'lesson-1', title: 'Managing Projects with sbt' },
                { id: 'lesson-2', title: 'Numerical Computing with Breeze' },
            ]
        },
    ]
};

const dsScalaModule2: Module = {
    id: 'module-2',
    title: 'Data Wrangling and Processing with Spark',
    classes: [
        {
            id: 'class-1',
            title: 'Introduction to Apache Spark',
            lessons: [
                { id: 'lesson-1', title: 'The Spark Ecosystem' },
                { id: 'lesson-2', title: 'Working with the Spark Shell' },
                { id: 'lesson-3', title: 'Resilient Distributed Datasets (RDDs)' },
            ]
        },
        {
            id: 'class-2',
            title: 'The Spark DataFrame API',
            lessons: [
                { id: 'lesson-1', title: 'Creating and Inspecting DataFrames' },
                { id: 'lesson-2', title: 'Selecting, Filtering, and Sorting' },
                { id: 'lesson-3', title: 'Grouping and Aggregation' },
                { id: 'lesson-4', title: 'Working with User-Defined Functions (UDFs)' },
            ]
        },
        {
            id: 'class-3',
            title: 'Spark SQL',
            lessons: [
                { id: 'lesson-1', title: 'Running SQL Queries on DataFrames' },
                { id: 'lesson-2', title: 'Interoperating with the DataFrame API' },
            ]
        },
    ]
};

const dsScalaModule3: Module = {
    id: 'module-3',
    title: 'Machine Learning with Spark MLlib',
    classes: [
        {
            id: 'class-1',
            title: 'Foundations of Spark ML',
            lessons: [
                { id: 'lesson-1', title: 'The MLlib Workflow: Transformers, Estimators, Pipelines' },
                { id: 'lesson-2', title: 'Feature Engineering and Selection' },
            ]
        },
        {
            id: 'class-2',
            title: 'Regression Algorithms',
            lessons: [
                { id: 'lesson-1', title: 'Linear Regression' },
                { id: 'lesson-2', title: 'Decision Trees for Regression' },
                { id: 'lesson-3', title: 'Evaluating Regression Models' },
            ]
        },
        {
            id: 'class-3',
            title: 'Classification Algorithms',
            lessons: [
                { id: 'lesson-1', title: 'Logistic Regression' },
                { id: 'lesson-2', title: 'Random Forests' },
                { id: 'lesson-3', title: 'Evaluating Classification Models' },
            ]
        },
        {
            id: 'class-4',
            title: 'Clustering',
            lessons: [
                { id: 'lesson-1', title: 'K-Means Clustering' },
                { id: 'lesson-2', title: 'Evaluating Clustering Models' },
            ]
        },
    ]
};

const dsScalaModule4: Module = {
    id: 'module-4',
    title: 'Advanced Analytics and Streaming',
    classes: [
        {
            id: 'class-1',
            title: 'Model Tuning and Selection',
            lessons: [
                { id: 'lesson-1', title: 'Cross-Validation' },
                { id: 'lesson-2', title: 'Hyperparameter Tuning with Grid Search' },
            ]
        },
        {
            id: 'class-2',
            title: 'Introduction to Spark Streaming',
            lessons: [
                { id: 'lesson-1', title: 'Discretized Streams (DStreams)' },
                { id: 'lesson-2', title: 'Stateful Transformations' },
                { id: 'lesson-3', title: 'Introduction to Structured Streaming' },
            ]
        },
    ]
};

const dsScalaModule5: Module = {
    id: 'module-5',
    title: 'Building Data Pipelines and Productionization',
    classes: [
        {
            id: 'class-1',
            title: 'Building Robust Data Pipelines',
            lessons: [
                { id: 'lesson-1', title: 'Structuring Spark Applications' },
                { id: 'lesson-2', title: 'Error Handling and Monitoring' },
            ]
        },
        {
            id: 'class-2',
            title: 'Deploying Spark Applications',
            lessons: [
                { id: 'lesson-1', title: 'Submitting Applications with spark-submit' },
                { id: 'lesson-2', title: 'Understanding the Spark UI' },
            ]
        },
    ]
};

// --- NEW SCALA COURSE: Advanced Apache Spark with Scala ---
const advSparkScalaModule1: Module = {
  id: 'module-1',
  title: 'Spark Internals and Optimization',
  classes: [
    { id: 'class-1', title: 'Deep Dive into Spark Architecture', lessons: [ { id: 'lesson-1', title: 'Jobs, Stages, and Tasks' }, { id: 'lesson-2', title: 'The Spark Execution Model and DAG' }, { id: 'lesson-3', title: 'Understanding Shuffling' } ] },
    { id: 'class-2', title: 'Performance Tuning', lessons: [ { id: 'lesson-1', title: 'Caching and Persistence Strategies' }, { id: 'lesson-2', title: 'Tuning Joins and Aggregations' }, { id: 'lesson-3', title: 'Understanding the Spark UI for Debugging' }, { id: 'lesson-4', title: 'Partitioning and Bucketing' } ] }
  ]
};
const advSparkScalaModule2: Module = {
  id: 'module-2',
  title: 'Advanced DataFrames and SQL',
  classes: [
    { id: 'class-1', title: 'Complex Data Types', lessons: [ { id: 'lesson-1', title: 'Working with Structs, Arrays, and Maps' } ] },
    { id: 'class-2', title: 'Advanced User-Defined Functions (UDFs)', lessons: [ { id: 'lesson-1', title: 'Creating and Registering UDFs' }, { id: 'lesson-2', title: 'Pandas UDFs for Performance' } ] },
    { id: 'class-3', title: 'The Catalyst Optimizer', lessons: [ { id: 'lesson-1', title: 'Logical vs. Physical Plans' } ] }
  ]
};
const advSparkScalaModule3: Module = {
  id: 'module-3',
  title: 'Structured Streaming In-Depth',
  classes: [
    { id: 'class-1', title: 'The Structured Streaming Model', lessons: [ { id: 'lesson-1', title: 'Sources and Sinks' }, { id: 'lesson-2', title: 'Output Modes' }, { id: 'lesson-3', title: 'Triggers' } ] },
    { id: 'class-2', title: 'Stateful Streaming', lessons: [ { id: 'lesson-1', title: 'Windowing on Event Time' }, { id: 'lesson-2', title: 'Managing State with mapGroupsWithState' } ] },
    { id: 'class-3', title: 'Working with Kafka', lessons: [ { id: 'lesson-1', title: 'Integrating Spark with Kafka' } ] }
  ]
};
const advSparkScalaModule4: Module = {
  id: 'module-4',
  title: 'Graph Analytics with GraphFrames',
  classes: [
    { id: 'class-1', title: 'Introduction to GraphFrames', lessons: [ { id: 'lesson-1', title: 'Vertices and Edges DataFrames' }, { id: 'lesson-2', title: 'Basic Graph Queries' } ] },
    { id: 'class-2', title: 'Graph Algorithms', lessons: [ { id: 'lesson-1', title: 'PageRank' }, { id: 'lesson-2', title: 'Connected Components' }, { id: 'lesson-3', title: 'Shortest Paths' } ] }
  ]
};
const advSparkScalaModule5: Module = {
  id: 'module-5',
  title: 'Deploying and Monitoring Spark Applications',
  classes: [
    { id: 'class-1', title: 'Application Deployment', lessons: [ { id: 'lesson-1', title: 'Packaging Dependencies' }, { id: 'lesson-2', title: 'Cluster Deployment Modes' } ] },
    { id: 'class-2', title: 'Monitoring and Alerting', lessons: [ { id: 'lesson-1', title: 'Using Spark Listeners' }, { id: 'lesson-2', title: 'Integrating with Monitoring Systems' } ] }
  ]
};


export const COURSES_DATA: Record<string, Course[]> = {
  python: [
    {
      id: 'ds-py',
      title: 'Data Science with Python',
      description: 'Master the fundamentals of data science, from data manipulation to visualization, using Python\'s powerful libraries.',
      modules: [
        dsPyModule1,
        dsPyModule2,
        dsPyModule3,
        dsPyModule4,
        dsPyModule5,
      ],
    },
    {
      id: 'ml-py',
      title: 'Machine Learning with Python',
      description: 'Build, train, and deploy machine learning models with Python, scikit-learn, and TensorFlow.',
      modules: [
        mlPyModule1,
        mlPyModule2,
        mlPyModule3,
        mlPyModule4,
        mlPyModule5,
      ],
    },
    {
      id: 'da-py',
      title: 'Data Analysis with Python',
      description: 'Learn to analyze and interpret complex datasets to extract meaningful insights with Python.',
      modules: [
        daPyModule1,
        daPyModule2,
        daPyModule3,
        daPyModule4,
        daPyModule5,
      ],
    },
    {
      id: 'ai-py',
      title: 'Artificial Intelligence with Python',
      description: 'Explore the world of AI, from search algorithms to neural networks, using Python.',
      modules: [
        aiPyModule1,
        aiPyModule2,
        aiPyModule3,
        aiPyModule4,
        aiPyModule5,
      ],
    },
    {
      id: 'dl-py',
      title: 'Deep Learning with Python',
      description: 'Dive into neural networks, build powerful models for image and text data with TensorFlow and Keras.',
      modules: [
        dlPyModule1,
        dlPyModule2,
        dlPyModule3,
        dlPyModule4,
        dlPyModule5,
      ],
    },
  ],
  r: [
    {
      id: 'ds-r',
      title: 'Data Science with R',
      description: 'Harness the statistical power of R for data science, from data wrangling with dplyr to visualization with ggplot2.',
      modules: [dsRModule1, dsRModule2, dsRModule3, dsRModule4, dsRModule5],
    },
    {
      id: 'da-r',
      title: 'Data Analysis with R',
      description: 'Dive deep into statistical analysis and data visualization to become a proficient data analyst with R.',
      modules: [daRModule1, daRModule2, daRModule3, daRModule4, daRModule5],
    },
     {
      id: 'ml-r',
      title: 'Machine Learning with R',
      description: 'Implement machine learning algorithms from scratch and with popular packages like caret and mlr3.',
      modules: [mlRModule1, mlRModule2, mlRModule3, mlRModule4, mlRModule5],
    },
    {
      id: 'ts-r',
      title: 'Time Series Analysis with R',
      description: 'Master forecasting techniques, from classical ARIMA models to modern methods, using R.',
      modules: [tsRModule1, tsRModule2, tsRModule3, tsRModule4, tsRModule5],
    },
  ],
  sql: [
      {
          id: 'da-sql',
          title: 'Data Analysis with SQL',
          description: 'Master the art of querying and analyzing data with SQL, the universal language of databases.',
          modules: [sqlModule1, sqlModule2, sqlModule3, sqlModule4, sqlModule5],
      },
      {
          id: 'bi-sql',
          title: 'SQL for Business Intelligence',
          description: 'Learn to write advanced SQL queries to derive business metrics, analyze cohorts, and build dashboards.',
          modules: [biSqlModule1, biSqlModule2, biSqlModule3, biSqlModule4, biSqlModule5],
      }
  ],
  scala: [
      {
          id: 'ds-scala',
          title: 'Data Science with Scala',
          description: 'Leverage the power of Scala and Apache Spark for large-scale data processing and machine learning.',
          modules: [dsScalaModule1, dsScalaModule2, dsScalaModule3, dsScalaModule4, dsScalaModule5],
      },
      {
          id: 'adv-spark-scala',
          title: 'Advanced Apache Spark with Scala',
          description: 'Deepen your Spark expertise with performance tuning, structured streaming, and advanced data processing techniques.',
          modules: [advSparkScalaModule1, advSparkScalaModule2, advSparkScalaModule3, advSparkScalaModule4, advSparkScalaModule5],
      }
  ]
};

export const PROJECTS_DATA: Record<string, Project[]> = {
    python: [
        { id: 'py-proj-1', title: 'Sales Data Analysis', description: 'Analyze a year\'s worth of sales data to find the best month for sales and which products sold the most.', difficulty: 'Beginner', tags: ['Pandas', 'Matplotlib', 'Data Analysis'] },
        { id: 'py-proj-2', title: 'Simple Web Scraper', description: 'Build a web scraper to extract headlines from a news website using Requests and BeautifulSoup.', difficulty: 'Beginner', tags: ['Web Scraping', 'Data Collection', 'Automation'] },
        { id: 'py-proj-3', title: 'Customer Churn Prediction', description: 'Use a dataset of telecom customers to build a machine learning model that predicts customer churn.', difficulty: 'Intermediate', tags: ['Scikit-learn', 'Classification', 'Feature Engineering'] },
        { id: 'py-proj-4', title: 'Sentiment Analysis of Movie Reviews', description: 'Perform sentiment analysis on a dataset of movie reviews to classify them as positive or negative.', difficulty: 'Intermediate', tags: ['NLP', 'TF-IDF', 'Machine Learning'] },
        { id: 'py-proj-5', title: 'Image Classifier for Fashion MNIST', description: 'Build a Convolutional Neural Network (CNN) to classify images of clothing from the Fashion MNIST dataset.', difficulty: 'Advanced', tags: ['Deep Learning', 'TensorFlow', 'Computer Vision'] },
        { id: 'py-proj-6', title: 'Handwritten Digit Recognition', description: 'Build a neural network with Keras to classify handwritten digits from the famous MNIST dataset.', difficulty: 'Beginner', tags: ['Deep Learning', 'Keras', 'Classification'] },
        { id: 'py-proj-7', title: 'Cat vs. Dog Image Classifier', description: 'Use transfer learning with a pre-trained CNN to build a high-accuracy classifier for images of cats and dogs.', difficulty: 'Intermediate', tags: ['Computer Vision', 'CNNs', 'Transfer Learning'] }
    ],
    r: [
        { id: 'r-proj-1', title: 'Exploring the Iris Dataset', description: 'Conduct an exploratory data analysis (EDA) on the classic Iris dataset to understand the relationships between flower measurements.', difficulty: 'Beginner', tags: ['dplyr', 'ggplot2', 'EDA'] },
        { id: 'r-proj-2', title: 'World Bank Data Visualization', description: 'Create compelling visualizations to explore development indicators from the World Bank dataset.', difficulty: 'Beginner', tags: ['Data Visualization', 'readr', 'Tidyverse'] },
        { id: 'r-proj-3', title: 'Ames Housing Price Prediction', description: 'Build a regression model to predict house prices using the Ames housing dataset and the tidymodels framework.', difficulty: 'Intermediate', tags: ['tidymodels', 'Regression', 'Machine Learning'] },
        { id: 'r-proj-4', title: 'Building an Interactive Shiny Dashboard', description: 'Create an interactive web application with Shiny to explore a dataset of your choice, allowing users to filter and visualize data.', difficulty: 'Intermediate', tags: ['Shiny', 'Dashboards', 'Interactivity'] },
        { id: 'r-proj-5', title: 'Time Series Forecasting of Stock Prices', description: 'Analyze and forecast stock price data for a major company using time series analysis techniques in R.', difficulty: 'Advanced', tags: ['Time Series', 'Forecasting', 'Statistics'] },
        { id: 'r-proj-6', title: 'Forecasting Air Passengers', description: 'Analyze the classic AirPassengers dataset and build an ARIMA model to forecast future passenger numbers.', difficulty: 'Beginner', tags: ['Time Series', 'ARIMA', 'Forecasting'] },
        { id: 'r-proj-7', title: 'Retail Sales Forecasting with Prophet', description: 'Use the Prophet library to forecast daily sales for a retail store, accounting for holidays and seasonality.', difficulty: 'Intermediate', tags: ['Prophet', 'Forecasting', 'Time Series'] }
    ],
    sql: [
        { id: 'sql-proj-1', title: 'Music Store Analysis', description: 'Query a database of a digital music store to find top-selling artists, genres, and customer demographics.', difficulty: 'Beginner', tags: ['SELECT', 'JOIN', 'Aggregation'] },
        { id: 'sql-proj-2', title: 'Analyzing Customer Orders', description: 'Use GROUP BY and aggregate functions to analyze an e-commerce database for insights on customer purchasing behavior.', difficulty: 'Beginner', tags: ['GROUP BY', 'Data Analysis', 'E-commerce'] },
        { id: 'sql-proj-3', title: 'Calculating Customer Lifetime Value (CLV)', description: 'Write complex queries using subqueries and CTEs to calculate the lifetime value of customers.', difficulty: 'Intermediate', tags: ['Subqueries', 'CTEs', 'Business Metrics'] },
        { id: 'sql-proj-4', title: 'Sales Cohort Analysis', description: 'Perform a cohort analysis to track customer retention over time using window functions and date manipulation.', difficulty: 'Intermediate', tags: ['Window Functions', 'Cohort Analysis', 'Marketing'] },
        { id: 'sql-proj-5', title: 'Building a Simple Recommendation Engine', description: 'Identify customers who bought similar products and build a basic "customers who bought this also bought..." feature using self-joins.', difficulty: 'Advanced', tags: ['Complex Joins', 'Recommendations', 'E-commerce'] },
        { id: 'sql-proj-6', title: 'Subscription Churn Analysis', description: 'Calculate monthly churn rates and identify key factors for a subscription-based service using SQL.', difficulty: 'Intermediate', tags: ['Business Metrics', 'SaaS', 'Window Functions'] },
        { id: 'sql-proj-7', title: 'User Engagement Funnel', description: 'Analyze user event data to build a conversion funnel and identify drop-off points in a product sign-up process.', difficulty: 'Advanced', tags: ['Funnel Analysis', 'User Behavior', 'CTEs'] }
    ],
    scala: [
        { id: 'scala-proj-1', title: 'Log File Analysis with Spark', description: 'Analyze web server log files to count error messages, identify the most frequent IP addresses, and find the busiest time periods.', difficulty: 'Beginner', tags: ['Apache Spark', 'DataFrames', 'Data Wrangling'] },
        { id: 'scala-proj-2', title: 'Movie Recommendation Engine with ALS', description: 'Build a movie recommendation engine using Spark MLlib\'s Alternating Least Squares (ALS) algorithm on the MovieLens dataset.', difficulty: 'Intermediate', tags: ['Spark MLlib', 'Machine Learning', 'Recommendations'] },
        { id: 'scala-proj-3', title: 'ETL Pipeline for Public Datasets', description: 'Create a robust ETL (Extract, Transform, Load) pipeline in Spark to process data from CSV and JSON formats into a cleaned Parquet format.', difficulty: 'Intermediate', tags: ['ETL', 'Spark SQL', 'Data Engineering'] },
        { id: 'scala-proj-4', title: 'Real-time Twitter Sentiment Analysis', description: 'Develop a Spark Streaming application to consume a stream of tweets and perform real-time sentiment analysis using a pre-trained model.', difficulty: 'Advanced', tags: ['Spark Streaming', 'NLP', 'Real-time'] },
        { id: 'scala-proj-5', title: 'Predicting Flight Delays', description: 'Build a complete machine learning pipeline with Spark ML to predict flight delays using a large dataset of airline on-time performance.', difficulty: 'Advanced', tags: ['Spark ML', 'Classification', 'Big Data'] },
        { id: 'scala-proj-6', title: 'Optimizing a Slow Spark Job', description: 'Analyze a poorly performing Spark job using the Spark UI, identify bottlenecks, and apply optimization techniques like partitioning and caching.', difficulty: 'Intermediate', tags: ['Spark Performance', 'Optimization', 'Spark UI'] },
        { id: 'scala-proj-7', title: 'Real-time Anomaly Detection', description: 'Use Structured Streaming to process a stream of sensor data and identify anomalous readings in real-time.', difficulty: 'Advanced', tags: ['Structured Streaming', 'Real-time', 'Anomaly Detection'] }
    ]
};