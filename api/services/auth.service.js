const UserService = require('./user.service');
const service = new UserService();

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const { config } = require('./../../config/config');
const nodemailer = require('nodemailer');

class authService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    user.password;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15 min'});
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update(user.id, {recoveryToken: token})
    const mail = {
        from: config.smpt_email,
        to: `${user.email}`,
        subject: 'Email para recuperar contraseña',
        html: `<b>Ingresa a este link para recuperar la contraseña => ${link}</b>`, 
      }

      const rta = await this.sendMail(mail)
      return rta
  }

  async sendMail(infoMail) {
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: config.smpt_email,
        pass: config.smpt_password,
      },
    });

    await transporter.sendMail(infoMail);

    return {message: 'mail sent'}
  }
}

module.exports = authService;
