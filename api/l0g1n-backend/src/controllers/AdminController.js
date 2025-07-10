const db = require('../db/dbClient');

const AdminController = {
  showLoginForm: (req, res) => {
    res.render('admin/login', { error: null });
  },

  processLogin: (req, res) => {
    const { username, password } = req.body;
    // 임시: 고정값 로그인
    if (username === 'l0gin' && password === '1234') {
      req.session.admin = true;
      res.redirect('/admin/dashboard');
    } else {
      res.render('admin/login', { error: '로그인 실패' });
    }
  },

  dashboard: async (req, res) => {
    if (!req.session.admin) return res.redirect('admin/login');
    
    /*
    const result = await db.query('SELECT * FROM l0g1n_project');
    if (result.rowCount === 0) {
      return res.redirect('/admin/project/create');
    }
    */
    res.render('admin/dashboard', { projects: result.rows });
  },

  showCreateProjectForm: (req, res) => {
    res.render('admin/project_create', { error: null });
  },

  createProject: async (req, res) => {
    const { code, name } = req.body;
    try {
      await db.query(
        'INSERT INTO l0g1n_project (project_code, project_name) VALUES ($1, $2)',
        [code, name]
      );
      res.redirect('/admin/dashboard');
    } catch (err) {
      res.render('admin/project_create', { error: '프로젝트 생성 실패' });
    }
  },
};

module.exports = AdminController;
