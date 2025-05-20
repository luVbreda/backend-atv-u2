import { registerUser, loginUser, getUserProfile, updateUserProfile, updateUserSettings } from '../api/controller/user.controller.js';

export default async function handler(req, res) {
  const { method, url } = req;

  // POST /api/users/register
  if (method === 'POST' && url.endsWith('/register')) {
    return registerUser(req, res);
  }

  // POST /api/users/login
  if (method === 'POST' && url.endsWith('/login')) {
    return loginUser(req, res);
  }

  // GET /api/users/:username
  if (method === 'GET') {
    const match = url.match(/\/api\/users\/([^\/]+)$/);
    if (match) {
      req.params = { username: match[1] };
      return getUserProfile(req, res);
    }
  }

  // PATCH /api/users/:username/settings
  if (method === 'PATCH' && url.match(/\/api\/users\/[^\/]+\/settings$/)) {
    const match = url.match(/\/api\/users\/([^\/]+)\/settings$/);
    if (match) {
      req.params = { username: match[1] };
      return updateUserSettings(req, res);
    }
  }

  // PATCH /api/users/:username
  if (method === 'PATCH') {
    const match = url.match(/\/api\/users\/([^\/]+)$/);
    if (match) {
      req.params = { username: match[1] };
      return updateUserProfile(req, res);
    }
  }

  res.status(404).json({ message: 'Not found' });
}