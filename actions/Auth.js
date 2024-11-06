import { expect } from '@playwright/test';

export class Auth {
  constructor(page) {
    this.page = page;
  }

  async login(email, password, username) {
    await this.visit();
    await this.submitForm(email, password);
    await this.isLoggedIn(username);
  }

  async visit() {
    await this.page.goto('http://localhost:3000/admin/login');
    const loginForm = this.page.locator('.login-form');
    await expect(loginForm).toBeVisible();
  }

  async submitForm(email, password) {
    await this.page.getByPlaceholder('E-mail').fill(email);
    await this.page.getByPlaceholder('Senha').fill(password);
    await this.page.getByText('Entrar').click();
  }

  async checkInputAlert(text) {
    const alert = this.page.locator('span[class$="alert"]');
    await expect(alert).toHaveText(text);
  }

  async isLoggedIn(username) {
    const loggedUser = this.page.locator('.logged-user');
    await expect(loggedUser).toHaveText(`Olá, ${username}`);
  }
}