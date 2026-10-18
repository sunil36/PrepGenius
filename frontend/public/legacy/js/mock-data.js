/* ==========================================================================
   PREPPILOT MOCK DATA ENGINE & SEED DATASET
   ========================================================================== */

const MockDB = {
  // Storage Keys
  STORAGE_KEYS: {
    CATEGORIES: 'preppilot_categories',
    TECHNOLOGIES: 'preppilot_technologies',
    TOPICS: 'preppilot_topics',
    SUBTOPICS: 'preppilot_subtopics',
    CONTENT: 'preppilot_content',
    QUESTIONS: 'preppilot_questions',
    MCQS: 'preppilot_mcqs',
    CODING: 'preppilot_coding',
    LEARNING_PATHS: 'preppilot_paths',
    USERS: 'preppilot_users',
    RESUMES: 'preppilot_resumes',
    JOBS: 'preppilot_jobs',
    APPLICATIONS: 'preppilot_applications',
    AUTOMATION_RULES: 'preppilot_automation_rules',
    AUTOMATION_LOGS: 'preppilot_automation_logs',
    NOTIFICATIONS: 'preppilot_notifications',
    AUDIT_LOGS: 'preppilot_audit_logs'
  },

  // Initialize DB with seed dataset if empty
  init() {
    if (!localStorage.getItem(this.STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(this.STORAGE_KEYS.CATEGORIES, JSON.stringify(this.seedCategories));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.TECHNOLOGIES)) {
      localStorage.setItem(this.STORAGE_KEYS.TECHNOLOGIES, JSON.stringify(this.seedTechnologies));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.TOPICS)) {
      localStorage.setItem(this.STORAGE_KEYS.TOPICS, JSON.stringify(this.seedTopics));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.SUBTOPICS)) {
      localStorage.setItem(this.STORAGE_KEYS.SUBTOPICS, JSON.stringify(this.seedSubtopics));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.CONTENT)) {
      localStorage.setItem(this.STORAGE_KEYS.CONTENT, JSON.stringify(this.seedContent));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.QUESTIONS)) {
      localStorage.setItem(this.STORAGE_KEYS.QUESTIONS, JSON.stringify(this.seedQuestions));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.MCQS)) {
      localStorage.setItem(this.STORAGE_KEYS.MCQS, JSON.stringify(this.seedMCQs));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.CODING)) {
      localStorage.setItem(this.STORAGE_KEYS.CODING, JSON.stringify(this.seedCoding));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.LEARNING_PATHS)) {
      localStorage.setItem(this.STORAGE_KEYS.LEARNING_PATHS, JSON.stringify(this.seedLearningPaths));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(this.seedUsers));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.RESUMES)) {
      localStorage.setItem(this.STORAGE_KEYS.RESUMES, JSON.stringify(this.seedResumes));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.JOBS)) {
      localStorage.setItem(this.STORAGE_KEYS.JOBS, JSON.stringify(this.seedJobs));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.APPLICATIONS)) {
      localStorage.setItem(this.STORAGE_KEYS.APPLICATIONS, JSON.stringify(this.seedApplications));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.AUTOMATION_RULES)) {
      localStorage.setItem(this.STORAGE_KEYS.AUTOMATION_RULES, JSON.stringify(this.seedAutomationRules));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.AUTOMATION_LOGS)) {
      localStorage.setItem(this.STORAGE_KEYS.AUTOMATION_LOGS, JSON.stringify(this.seedAutomationLogs));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.NOTIFICATIONS)) {
      localStorage.setItem(this.STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(this.seedNotifications));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.AUDIT_LOGS)) {
      localStorage.setItem(this.STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(this.seedAuditLogs));
    }
  },

  // Helper getters and setters
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },

  // --- SEED DATASETS ---
  seedCategories: [
    { id: 'cat-1', name: 'Backend Development', slug: 'backend-development', description: 'Server-side architecture, APIs, microservices & databases', icon: 'bi-hdd-network', count: 48, status: 'active', displayOrder: 1 },
    { id: 'cat-2', name: 'Frontend Development', slug: 'frontend-development', description: 'Modern UI engineering, state management and web vitals', icon: 'bi-window-sidebar', count: 34, status: 'active', displayOrder: 2 },
    { id: 'cat-3', name: 'System Design & Architecture', slug: 'system-design', description: 'Distributed systems, caching, scaling & high availability', icon: 'bi-diagram-3', count: 26, status: 'active', displayOrder: 3 },
    { id: 'cat-4', name: 'DevOps & Cloud', slug: 'devops-cloud', description: 'CI/CD, containerization, Kubernetes & AWS infrastructure', icon: 'bi-clouds', count: 29, status: 'active', displayOrder: 4 },
    { id: 'cat-5', name: 'Behavioral & Leadership', slug: 'behavioral', description: 'STAR method responses, culture fit & conflict resolution', icon: 'bi-people', count: 18, status: 'active', displayOrder: 5 }
  ],

  seedTechnologies: [
    { id: 'tech-1', categoryId: 'cat-1', name: 'Python', slug: 'python', icon: 'bi-filetype-py', description: 'Core Python, OOP, GIL, AsyncIO, and Metaprogramming', level: 'All Levels', questionsCount: 142, status: 'active', order: 1 },
    { id: 'tech-2', categoryId: 'cat-1', name: 'Django / FastAPI', slug: 'django-fastapi', icon: 'bi-layers', description: 'Web frameworks, ORM, Pydantic, OpenAPI & Middleware', level: 'Intermediate', questionsCount: 88, status: 'active', order: 2 },
    { id: 'tech-3', categoryId: 'cat-1', name: 'PostgreSQL & SQL', slug: 'postgresql-sql', icon: 'bi-database', description: 'Indexing, query optimization, ACID transactions, partitioning', level: 'All Levels', questionsCount: 96, status: 'active', order: 3 },
    { id: 'tech-4', categoryId: 'cat-3', name: 'System Design', slug: 'system-design', icon: 'bi-diagram-3-fill', description: 'Rate limiters, URL shorteners, caching layers & queues', level: 'Advanced', questionsCount: 52, status: 'active', order: 4 },
    { id: 'tech-5', categoryId: 'cat-4', name: 'Docker & Kubernetes', slug: 'docker-kubernetes', icon: 'bi-boxes', description: 'Containers, Pod lifecycle, Services, Ingress, Helm', level: 'Intermediate', questionsCount: 64, status: 'active', order: 5 }
  ],

  seedTopics: [
    {
      id: 'top-1',
      techId: 'tech-1',
      techName: 'Python',
      name: 'Object Oriented Programming',
      slug: 'object-oriented-programming',
      description: 'Comprehensive mastery of classes, inheritance, dunder methods, encapsulation and polymorphism in Python.',
      difficulty: 'Intermediate',
      estimatedTime: '45 mins',
      status: 'published',
      author: 'Principal Architect',
      updatedAt: '2026-09-08',
      questionsCount: 18,
      notesCount: 8,
      mcqsCount: 12,
      codingCount: 4
    },
    {
      id: 'top-2',
      techId: 'tech-1',
      techName: 'Python',
      name: 'AsyncIO & Concurrency',
      slug: 'asyncio-and-concurrency',
      description: 'Event loops, coroutines, tasks, threading vs multiprocessing vs async in modern Python.',
      difficulty: 'Advanced',
      estimatedTime: '60 mins',
      status: 'published',
      author: 'Senior Staff Engineer',
      updatedAt: '2026-09-06',
      questionsCount: 14,
      notesCount: 6,
      mcqsCount: 8,
      codingCount: 3
    },
    {
      id: 'top-3',
      techId: 'tech-3',
      techName: 'PostgreSQL & SQL',
      name: 'Query Optimization & Indexing',
      slug: 'query-optimization-indexing',
      description: 'B-Tree, GIN, GiST, EXPLAIN ANALYZE execution plans and query tuning techniques.',
      difficulty: 'Advanced',
      estimatedTime: '50 mins',
      status: 'published',
      author: 'Database Specialist',
      updatedAt: '2026-09-05',
      questionsCount: 16,
      notesCount: 7,
      mcqsCount: 10,
      codingCount: 5
    }
  ],

  seedSubtopics: [
    { id: 'sub-1', topicId: 'top-1', title: 'Self & The Instance Lifecycle (__init__ vs __new__)', order: 1, status: 'published' },
    { id: 'sub-2', topicId: 'top-1', title: 'Encapsulation & Private Attributes Name Mangling', order: 2, status: 'published' },
    { id: 'sub-3', topicId: 'top-1', title: 'Multiple Inheritance & Method Resolution Order (MRO)', order: 3, status: 'published' },
    { id: 'sub-4', topicId: 'top-1', title: 'Polymorphism & Abstract Base Classes (abc.ABC)', order: 4, status: 'published' },
    { id: 'sub-5', topicId: 'top-1', title: 'Properties & Getters/Setters (@property)', order: 5, status: 'published' },
    { id: 'sub-6', topicId: 'top-1', title: 'Class Decorators & Metaclasses', order: 6, status: 'published' }
  ],

  seedContent: [
    {
      id: 'cnt-1',
      subtopicId: 'sub-3',
      topicId: 'top-1',
      techId: 'tech-1',
      title: 'Deep Dive: Method Resolution Order (MRO) and C3 Linearization',
      type: 'Note',
      difficulty: 'Advanced',
      status: 'published',
      author: 'Alexander Wright',
      updatedAt: '2026-09-07',
      readTime: '8 min read',
      body: `<h3>What is MRO in Python?</h3>
<p>In Python, Method Resolution Order (MRO) defines the exact sequence in which base classes are searched when looking for an attribute or method on an instance. Since Python 2.3, the <strong>C3 Linearization Algorithm</strong> is used to resolve ambiguous multiple inheritance diamond problems.</p>
<div class="callout callout-info">
  <strong>Rule of C3:</strong> A class always precedes its parents, and the original order of base classes is strictly preserved without cyclic dependencies.
</div>
<h4>Example Code</h4>
<pre><code>class A:
    def greet(self):
        return "Hello from A"

class B(A):
    def greet(self):
        return "Hello from B -> " + super().greet()

class C(A):
    def greet(self):
        return "Hello from C -> " + super().greet()

class D(B, C):
    pass

# Inspection:
print(D.mro())
# Output: [D, B, C, A, object]
d = D()
print(d.greet()) # "Hello from B -> Hello from C -> Hello from A"</code></pre>
<h4>Key Interview Pitfalls</h4>
<p>Candidates often assume <code>super()</code> simply calls the immediate parent class. In multiple inheritance, <code>super()</code> delegates to the <em>next class in the MRO graph</em>, not necessarily the parent!</p>`
    }
  ],

  seedQuestions: [
    {
      id: 'q-1',
      topicId: 'top-1',
      techName: 'Python',
      title: 'Explain the difference between __new__ and __init__ in Python.',
      type: 'Conceptual',
      difficulty: 'Intermediate',
      shortAnswer: '__new__ is the static creator method that actually instantiates and returns the object instance, while __init__ is the initializer method that configures attributes on that created instance.',
      detailedAnswer: '<p><code>__new__</code> is the first step in object creation. It is called before <code>__init__</code> and is responsible for allocating memory and returning a new instance of the class.</p><p><code>__init__</code> takes the newly created instance (as <code>self</code>) and sets up its initial state. If <code>__new__</code> does not return an instance of the class, <code>__init__</code> will not be called.</p>',
      interviewTips: 'Mention immutable types (like tuple or int subclassing) and singleton design patterns as classic use-cases for overriding __new__.',
      commonMistakes: 'Thinking __init__ is the constructor. It is solely an initializer; __new__ is the constructor.',
      status: 'published',
      author: 'Lead Architect',
      updatedAt: '2026-09-08'
    },
    {
      id: 'q-2',
      topicId: 'top-1',
      techName: 'Python',
      title: 'How does Python implement Encapsulation and Name Mangling for private members?',
      type: 'Conceptual',
      difficulty: 'Intermediate',
      shortAnswer: 'Python does not enforce true private variables at the runtime bytecode level. Instead, double leading underscores (e.g. __var) trigger name mangling, transforming the attribute name to _ClassName__var to prevent accidental subclass override.',
      detailedAnswer: '<p>Python follows the philosophy "we are all consenting adults here". Single underscore <code>_var</code> is a convention indicating internal use. Double underscore <code>__var</code> triggers name mangling by appending <code>_ClassName</code> to the attribute name.</p>',
      interviewTips: 'Demonstrate that you know private attributes can still be accessed via <code>obj._ClassName__var</code> if someone deliberately intends to.',
      commonMistakes: 'Saying Python has real access modifiers like Java or C++.',
      status: 'published',
      author: 'Principal Reviewer',
      updatedAt: '2026-09-07'
    }
  ],

  seedMCQs: [
    {
      id: 'mcq-1',
      topicId: 'top-1',
      techName: 'Python',
      question: 'What is the output of inspecting the __mro__ of a class defined as `class D(B, C): pass` where B and C inherit from A?',
      options: [
        { id: 'A', text: '[D, B, A, C, object]' },
        { id: 'B', text: '[D, B, C, A, object]' },
        { id: 'C', text: '[D, C, B, A, object]' },
        { id: 'D', text: '[D, A, B, C, object]' }
      ],
      correctAnswer: 'B',
      explanation: 'Under C3 Linearization, sibling classes B and C are evaluated depth-first but preserving local precedence order before reaching the shared common ancestor A.',
      difficulty: 'Intermediate',
      accuracyRate: '72%',
      attempts: 1240
    }
  ],

  seedCoding: [
    {
      id: 'code-1',
      topicId: 'top-1',
      techName: 'Python',
      title: 'Implement a Thread-Safe Singleton Metaclass',
      difficulty: 'Hard',
      description: 'Create a metaclass `SingletonMeta` in Python that ensures only one instance of any class using it as its metaclass can ever be created, even under high concurrent multi-threaded access.',
      starterCode: `import threading

class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        # Implement thread-safe double-checked locking here
        pass
`,
      solutionCode: `import threading

class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with cls._lock:
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]
`,
      constraints: 'Must handle race conditions without locking on every read once instantiated (double-checked locking pattern).',
      hints: ['Use threading.Lock()', 'Check instance existence before acquiring the lock to minimize lock contention.']
    }
  ],

  seedLearningPaths: [
    {
      id: 'path-1',
      title: 'Senior Python Backend Architect',
      slug: 'senior-python-backend-architect',
      description: 'From core Python internals to High-Throughput FastAPI Microservices, Distributed Caching, and AWS Deployment.',
      estimatedHours: '48 Hours',
      modulesCount: 8,
      topicsCount: 24,
      enrolledCount: 3840,
      completionRate: '68%',
      badge: 'Popular',
      status: 'published'
    },
    {
      id: 'path-2',
      title: 'Full-Stack Engineering & System Design',
      slug: 'fullstack-system-design',
      description: 'End-to-end full stack mastery covering scalable REST/GraphQL APIs, React 19, Redis caching, and CI/CD pipelines.',
      estimatedHours: '64 Hours',
      modulesCount: 12,
      topicsCount: 36,
      enrolledCount: 2950,
      completionRate: '54%',
      badge: 'Featured',
      status: 'published'
    }
  ],

  seedUsers: [
    { id: 'usr-1', name: 'Alex Johnson', email: 'alex.johnson@example.com', role: 'Candidate', status: 'Active', progress: 78, targetRole: 'Senior Backend Engineer', joinedDate: '2026-08-12', lastActive: '10 mins ago' },
    { id: 'usr-2', name: 'Sarah Chen', email: 'sarah.chen@techlead.io', role: 'Candidate', status: 'Active', progress: 92, targetRole: 'Staff Software Engineer', joinedDate: '2026-07-28', lastActive: '2 hours ago' },
    { id: 'usr-3', name: 'Michael Rodriguez', email: 'm.rodriguez@clouddev.com', role: 'Candidate', status: 'Active', progress: 64, targetRole: 'DevOps / Platform Engineer', joinedDate: '2026-08-30', lastActive: '1 day ago' },
    { id: 'usr-4', name: 'Emma Watson', email: 'emma.w@preppilot.com', role: 'Admin', status: 'Active', progress: 100, targetRole: 'Lead Content Architect', joinedDate: '2026-01-15', lastActive: 'Just now' }
  ],

  seedResumes: [
    {
      id: 'res-1',
      title: 'Senior Python Backend Engineer - FAANG Focus',
      targetRole: 'Senior Python Backend Engineer',
      isDefault: true,
      atsScore: 92,
      skillMatch: 94,
      keywordMatch: 89,
      updatedAt: '2026-09-07',
      personalInfo: {
        fullName: 'Alex Johnson',
        email: 'alex.j@example.com',
        phone: '+1 (555) 234-8901',
        location: 'San Francisco, CA (Open to Remote)',
        linkedin: 'linkedin.com/in/alexjohnson-dev',
        github: 'github.com/alexj-code'
      },
      summary: 'Results-driven Senior Backend Engineer with 6+ years designing high-throughput distributed systems in Python, FastAPI, PostgreSQL, and AWS. Proven track record optimizing database queries reducing latency by 45% for 4M+ daily active users.',
      skills: ['Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS (ECS, S3, RDS)', 'System Design', 'CI/CD'],
      experience: [
        {
          company: 'FinScale Technologies',
          role: 'Senior Backend Engineer',
          period: '2023 - Present',
          points: [
            'Architected async payment processing microservice handling 15,000 requests/sec with 99.99% uptime SLA.',
            'Refactored legacy PostgreSQL queries and implemented Redis caching layer reducing p99 latency from 320ms to 42ms.',
            'Mentored 5 mid-level engineers and spearheaded automated CI/CD deployment pipelines on AWS ECS.'
          ]
        },
        {
          company: 'CloudSphere Labs',
          role: 'Backend Software Engineer',
          period: '2020 - 2023',
          points: [
            'Built RESTful and GraphQL APIs in Python & Django supporting multi-tenant enterprise customers.',
            'Implemented Celery distributed task workers processing over 2M data ingestion jobs daily.'
          ]
        }
      ],
      education: [
        { degree: 'B.S. in Computer Science', institution: 'University of California, Berkeley', year: '2016 - 2020' }
      ]
    }
  ],

  seedJobs: [
    {
      id: 'job-1',
      title: 'Senior Python Backend Engineer',
      company: 'Stripe',
      location: 'San Francisco, CA / Remote',
      salary: '$180,000 - $225,000',
      type: 'Full-time',
      experience: '5+ Years',
      matchScore: 94,
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'Distributed Systems', 'Redis', 'AWS'],
      missingSkills: ['Kafka'],
      postedDate: '1 day ago',
      description: 'Stripe is looking for a Senior Python Engineer to lead architecture on our real-time core billing engine. You will design fault-tolerant transaction pipelines and partner with platform engineering to scale infrastructure.',
      source: 'Direct Career Portal'
    },
    {
      id: 'job-2',
      title: 'Staff Software Engineer - Infrastructure',
      company: 'Datadog',
      location: 'New York, NY / Remote',
      salary: '$210,000 - $260,000',
      type: 'Full-time',
      experience: '7+ Years',
      matchScore: 88,
      skills: ['Python', 'Kubernetes', 'Distributed Systems', 'PostgreSQL', 'Docker'],
      missingSkills: ['Go', 'eBPF'],
      postedDate: '2 days ago',
      description: 'Join our telemetry collection engineering group building high-volume metric ingestion pipelines handling petabytes of data daily.',
      source: 'LinkedIn Talent'
    },
    {
      id: 'job-3',
      title: 'Lead Backend Developer (FastAPI / AI Platform)',
      company: 'Scale AI',
      location: 'San Francisco, CA',
      salary: '$195,000 - $240,000',
      type: 'Full-time',
      experience: '5+ Years',
      matchScore: 96,
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      missingSkills: [],
      postedDate: '3 hours ago',
      description: 'Leading the AI data curation pipeline backend. High performance async I/O, heavy microservice orchestration, and model evaluation APIs.',
      source: 'Greenhouse API'
    }
  ],

  seedApplications: [
    { id: 'app-1', jobId: 'job-3', company: 'Scale AI', role: 'Lead Backend Developer', matchScore: 96, stage: 'Interview', salary: '$195,000 - $240,000', appliedDate: '2026-09-02', nextStep: 'System Design Round on Friday', notes: 'Spoke with hiring manager; team is focusing on async throughput.' },
    { id: 'app-2', jobId: 'job-1', company: 'Stripe', role: 'Senior Python Backend Engineer', matchScore: 94, stage: 'Screening', salary: '$180,000 - $225,000', appliedDate: '2026-09-05', nextStep: 'Recruiter call scheduled for tomorrow 2 PM', notes: 'Cover letter highlighted payment ingestion refactoring.' },
    { id: 'app-3', jobId: 'job-2', company: 'Datadog', role: 'Staff Software Engineer', matchScore: 88, stage: 'Applied', salary: '$210,000 - $260,000', appliedDate: '2026-09-07', nextStep: 'Application under review', notes: 'Automated application generated and approved.' },
    { id: 'app-4', jobId: 'job-4', company: 'Airbnb', role: 'Senior Platform Engineer', matchScore: 90, stage: 'Saved', salary: '$190,000 - $235,000', appliedDate: 'N/A', nextStep: 'Needs resume tailoring', notes: 'Targeting next week after mock interview practice.' }
  ],

  seedAutomationRules: [
    {
      id: 'rule-1',
      name: 'High-Match Senior Python Roles (US Remote)',
      targetTitles: ['Senior Python Engineer', 'Senior Backend Engineer', 'Staff Software Engineer'],
      targetLocations: ['Remote US', 'San Francisco, CA', 'New York, NY'],
      minSalary: 175000,
      minMatchScore: 90,
      approvalMode: 'Review & Approve', // 'Manual' | 'Review & Approve' | 'Automatic'
      status: 'Active',
      dailyLimit: 10,
      applicationsToday: 3,
      resumeId: 'res-1',
      autoSubmitConfirmed: false
    }
  ],

  seedAutomationLogs: [
    { id: 'log-1', timestamp: '8:42 PM Today', action: 'Scan Complete', detail: 'Scanned 142 new listings across Greenhouse, Lever, and LinkedIn.' },
    { id: 'log-2', timestamp: '8:44 PM Today', action: 'Match Evaluated', detail: 'Found 12 matching roles exceeding 90% ATS match threshold.' },
    { id: 'log-3', timestamp: '8:46 PM Today', action: 'Application Prepared', detail: 'Prepared tailored application for Scale AI (96% Match) - Queued for user approval.' },
    { id: 'log-4', timestamp: '8:48 PM Today', action: 'Review Required', detail: '2 new applications awaiting user review in Approval Queue.' }
  ],

  seedNotifications: [
    { id: 'notif-1', title: 'New 96% Match Job Found', message: 'Scale AI just posted Lead Backend Developer matching your Senior Python profile.', time: '15 mins ago', read: false, type: 'job' },
    { id: 'notif-2', title: 'Interview Scheduled', message: 'Scale AI confirmed System Design round for Friday, Sept 12 at 10:00 AM PST.', time: '2 hours ago', read: false, type: 'interview' },
    { id: 'notif-3', title: 'Application Prepared by Automation', message: 'PrepPilot Auto-apply created a draft application for Stripe with custom cover letter.', time: '5 hours ago', read: true, type: 'automation' },
    { id: 'notif-4', title: 'Resume ATS Score Improved', message: 'Your updated Python resume achieved a 92% ATS score (+6% improvement).', time: '1 day ago', read: true, type: 'resume' }
  ],

  seedAuditLogs: [
    { id: 'aud-1', user: 'Emma Watson (Admin)', action: 'Published Topic', entity: 'Topic: AsyncIO & Concurrency', oldValue: 'Status: Draft', newValue: 'Status: Published', timestamp: '2026-09-08 20:14:10', ip: '192.168.1.104' },
    { id: 'aud-2', user: 'Alex Johnson (Candidate)', action: 'Generated Application', entity: 'Application: Scale AI', oldValue: 'Stage: Null', newValue: 'Stage: Queued', timestamp: '2026-09-08 20:46:12', ip: '74.125.21.9' },
    { id: 'aud-3', user: 'System Automation', action: 'Ingested Job Feeds', entity: 'Job Source: Greenhouse Sync', oldValue: 'Count: 840', newValue: 'Count: 982', timestamp: '2026-09-08 20:42:00', ip: 'internal-worker-01' }
  ]
};

// Auto-run init
MockDB.init();
