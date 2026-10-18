/* ==========================================================================
   PREPPILOT API ABSTRACTION LAYER (PROMISE-READY INTERFACE)
   ========================================================================== */

const API = {
  // Simulated asynchronous network delay helper
  _delay(ms = 80) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // --- TOPICS & HIERARCHY ---
  topics: {
    async list(filters = {}) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.TOPICS);
      if (filters.techId) items = items.filter(t => t.techId === filters.techId);
      if (filters.search) {
        const q = filters.search.toLowerCase();
        items = items.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
      }
      return { data: items, total: items.length };
    },

    async get(id) {
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.TOPICS);
      const found = items.find(t => t.id === id);
      if (!found) throw new Error(`Topic with id ${id} not found`);
      return { data: found };
    },

    async create(payload) {
      // POST /api/admin/topics
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.TOPICS);
      const newTopic = {
        id: 'top-' + Date.now(),
        updatedAt: new Date().toISOString().split('T')[0],
        status: payload.status || 'draft',
        questionsCount: 0,
        notesCount: 0,
        mcqsCount: 0,
        codingCount: 0,
        ...payload
      };
      items.unshift(newTopic);
      MockDB.set(MockDB.STORAGE_KEYS.TOPICS, items);
      API.auditLogs.record('Created Topic', `Topic: ${newTopic.name}`);
      return { data: newTopic, message: 'Topic created successfully' };
    },

    async update(id, payload) {
      // PUT /api/admin/topics/:id
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.TOPICS);
      const index = items.findIndex(t => t.id === id);
      if (index === -1) throw new Error('Topic not found');
      items[index] = { ...items[index], ...payload, updatedAt: new Date().toISOString().split('T')[0] };
      MockDB.set(MockDB.STORAGE_KEYS.TOPICS, items);
      API.auditLogs.record('Updated Topic', `Topic: ${items[index].name}`);
      return { data: items[index], message: 'Topic updated successfully' };
    },

    async delete(id) {
      // DELETE /api/admin/topics/:id
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.TOPICS);
      const target = items.find(t => t.id === id);
      items = items.filter(t => t.id !== id);
      MockDB.set(MockDB.STORAGE_KEYS.TOPICS, items);
      API.auditLogs.record('Deleted Topic', `Topic ID: ${id}`);
      return { success: true, message: `Topic "${target?.name || id}" deleted successfully` };
    }
  },

  // --- CATEGORIES & TECHNOLOGIES ---
  categories: {
    async list() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.CATEGORIES) };
    },
    async save(payload) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.CATEGORIES);
      if (payload.id) {
        const idx = items.findIndex(c => c.id === payload.id);
        if (idx !== -1) items[idx] = { ...items[idx], ...payload };
      } else {
        payload.id = 'cat-' + Date.now();
        payload.count = 0;
        items.push(payload);
      }
      MockDB.set(MockDB.STORAGE_KEYS.CATEGORIES, items);
      return { data: payload };
    },
    async delete(id) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.CATEGORIES);
      items = items.filter(c => c.id !== id);
      MockDB.set(MockDB.STORAGE_KEYS.CATEGORIES, items);
      return { success: true };
    }
  },

  technologies: {
    async list(categoryId = null) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.TECHNOLOGIES);
      if (categoryId) items = items.filter(t => t.categoryId === categoryId);
      return { data: items };
    },
    async save(payload) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.TECHNOLOGIES);
      if (payload.id) {
        const idx = items.findIndex(t => t.id === payload.id);
        if (idx !== -1) items[idx] = { ...items[idx], ...payload };
      } else {
        payload.id = 'tech-' + Date.now();
        payload.questionsCount = 0;
        items.push(payload);
      }
      MockDB.set(MockDB.STORAGE_KEYS.TECHNOLOGIES, items);
      return { data: payload };
    },
    async delete(id) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.TECHNOLOGIES);
      items = items.filter(t => t.id !== id);
      MockDB.set(MockDB.STORAGE_KEYS.TECHNOLOGIES, items);
      return { success: true };
    }
  },

  // --- QUESTIONS & CONTENT ---
  questions: {
    async list(filters = {}) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.QUESTIONS);
      if (filters.difficulty) items = items.filter(q => q.difficulty === filters.difficulty);
      if (filters.type) items = items.filter(q => q.type === filters.type);
      if (filters.search) {
        const query = filters.search.toLowerCase();
        items = items.filter(q => q.title.toLowerCase().includes(query) || q.shortAnswer.toLowerCase().includes(query));
      }
      return { data: items, total: items.length };
    },
    async get(id) {
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.QUESTIONS);
      return { data: items.find(q => q.id === id) };
    },
    async create(payload) {
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.QUESTIONS);
      const newQ = { id: 'q-' + Date.now(), updatedAt: new Date().toISOString().split('T')[0], status: 'published', ...payload };
      items.unshift(newQ);
      MockDB.set(MockDB.STORAGE_KEYS.QUESTIONS, items);
      return { data: newQ, message: 'Question created successfully' };
    },
    async update(id, payload) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.QUESTIONS);
      const idx = items.findIndex(q => q.id === id);
      if (idx !== -1) items[idx] = { ...items[idx], ...payload, updatedAt: new Date().toISOString().split('T')[0] };
      MockDB.set(MockDB.STORAGE_KEYS.QUESTIONS, items);
      return { data: items[idx], message: 'Question updated successfully' };
    },
    async delete(id) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.QUESTIONS);
      items = items.filter(q => q.id !== id);
      MockDB.set(MockDB.STORAGE_KEYS.QUESTIONS, items);
      return { success: true };
    }
  },

  // --- RESUMES ---
  resumes: {
    async list() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.RESUMES) };
    },
    async get(id) {
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.RESUMES);
      return { data: items.find(r => r.id === id) || items[0] };
    },
    async save(payload) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.RESUMES);
      if (payload.id) {
        const idx = items.findIndex(r => r.id === payload.id);
        if (idx !== -1) items[idx] = { ...items[idx], ...payload, updatedAt: new Date().toISOString().split('T')[0] };
      } else {
        payload.id = 'res-' + Date.now();
        payload.atsScore = 92;
        payload.updatedAt = new Date().toISOString().split('T')[0];
        items.unshift(payload);
      }
      MockDB.set(MockDB.STORAGE_KEYS.RESUMES, items);
      return { data: payload, message: 'Resume saved successfully' };
    },
    async delete(id) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.RESUMES);
      items = items.filter(r => r.id !== id);
      MockDB.set(MockDB.STORAGE_KEYS.RESUMES, items);
      return { success: true, message: 'Resume deleted successfully' };
    }
  },

  // --- JOBS & RESUME MATCHING ---
  jobs: {
    async list(filters = {}) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.JOBS);
      if (filters.search) {
        const q = filters.search.toLowerCase();
        items = items.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));
      }
      return { data: items, total: items.length };
    },
    async get(id) {
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.JOBS);
      return { data: items.find(j => j.id === id) || items[0] };
    },
    async matchResume(jobId, resumeId) {
      await API._delay();
      return {
        matchScore: 94,
        matchedSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS'],
        missingSkills: ['Kafka', 'eBPF'],
        recommendations: [
          'Add 1 bullet point demonstrating Kafka event streaming in FinScale experience.',
          'Quantify AWS ECS infrastructure cost optimization in your project section.'
        ]
      };
    }
  },

  // --- APPLICATIONS & KANBAN ---
  applications: {
    async list() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.APPLICATIONS) };
    },
    async updateStage(id, newStage) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.APPLICATIONS);
      const idx = items.findIndex(a => a.id === id);
      if (idx !== -1) {
        items[idx].stage = newStage;
        MockDB.set(MockDB.STORAGE_KEYS.APPLICATIONS, items);
        API.auditLogs.record('Updated Application Stage', `App ID: ${id} -> ${newStage}`);
      }
      return { data: items[idx] };
    },
    async create(payload) {
      await API._delay();
      const items = MockDB.get(MockDB.STORAGE_KEYS.APPLICATIONS);
      const newApp = {
        id: 'app-' + Date.now(),
        appliedDate: new Date().toISOString().split('T')[0],
        stage: payload.stage || 'Applied',
        ...payload
      };
      items.unshift(newApp);
      MockDB.set(MockDB.STORAGE_KEYS.APPLICATIONS, items);
      return { data: newApp, message: 'Application submitted successfully' };
    }
  },

  // --- APPLICATION AUTOMATION ---
  automation: {
    async getRules() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.AUTOMATION_RULES) };
    },
    async saveRule(payload) {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.AUTOMATION_RULES);
      if (payload.id) {
        const idx = items.findIndex(r => r.id === payload.id);
        if (idx !== -1) items[idx] = { ...items[idx], ...payload };
      } else {
        payload.id = 'rule-' + Date.now();
        payload.applicationsToday = 0;
        items.push(payload);
      }
      MockDB.set(MockDB.STORAGE_KEYS.AUTOMATION_RULES, items);
      return { data: payload, message: 'Automation rule saved' };
    },
    async getLogs() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.AUTOMATION_LOGS) };
    },
    async triggerScan() {
      await API._delay(200);
      const logs = MockDB.get(MockDB.STORAGE_KEYS.AUTOMATION_LOGS);
      const newLog = {
        id: 'log-' + Date.now(),
        timestamp: 'Just now',
        action: 'Manual Scan Complete',
        detail: 'Scanned 64 target career portals. 3 new high-match positions queued for review.'
      };
      logs.unshift(newLog);
      MockDB.set(MockDB.STORAGE_KEYS.AUTOMATION_LOGS, logs);
      return { success: true, countFound: 3 };
    }
  },

  // --- NOTIFICATIONS & AUDIT ---
  notifications: {
    async list() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.NOTIFICATIONS) };
    },
    async markAllRead() {
      await API._delay();
      let items = MockDB.get(MockDB.STORAGE_KEYS.NOTIFICATIONS);
      items = items.map(n => ({ ...n, read: true }));
      MockDB.set(MockDB.STORAGE_KEYS.NOTIFICATIONS, items);
      return { success: true };
    }
  },

  auditLogs: {
    async list() {
      await API._delay();
      return { data: MockDB.get(MockDB.STORAGE_KEYS.AUDIT_LOGS) };
    },
    record(action, entity) {
      const logs = MockDB.get(MockDB.STORAGE_KEYS.AUDIT_LOGS);
      logs.unshift({
        id: 'aud-' + Date.now(),
        user: 'Active User',
        action,
        entity,
        oldValue: 'N/A',
        newValue: 'Updated',
        timestamp: new Date().toLocaleString(),
        ip: '127.0.0.1'
      });
      MockDB.set(MockDB.STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 50));
    }
  }
};
