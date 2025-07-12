const express = require('express');
const AdminController = require('../controllers/AdminController.js');

const router = express.Router();

router.get('/login', AdminController.showLoginForm);
router.post('/loginPost', AdminController.processLogin);

router.get('/dashboard', AdminController.dashboard);
router.get('/project/create', AdminController.showCreateProjectForm);
router.post('/project/create', AdminController.createProject);

// 프로젝트 상세 페이지
router.get('/project/:projectCode', AdminController.showProjectDetail);
router.post('/project/:projectCode/api/add', AdminController.addProjectApi);
router.delete('/project/:projectCode/api/:apiId', AdminController.removeProjectApi);

// API 엔드포인트
router.get('/api/projects', AdminController.getAllProjectsApi);
router.get('/api/project/:projectCode/users', AdminController.getProjectUsersApi);
router.get('/api/auth-codes', AdminController.getAuthCodesApi);

module.exports = router;
