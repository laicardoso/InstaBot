const puppeteer = require('puppeteer');

async function unfollowAllUsers(username, password) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navegar até a página de login do Instagram
  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

  // Preencher os campos de login e senha
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);

  // Enviar o formulário de login
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Navegar até a página do perfil do usuário
  await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: 'networkidle2' });

  // Clicar no botão de "Seguindo" para abrir a lista de perfis seguidos
  await page.click('a[href="/accounts/activity/"]');

  // Esperar um tempo para garantir que a lista de perfis seguidos seja carregada
  await page.waitForTimeout(2000);

  // Obter todos os botões "Seguindo" na página
  const followButtons = await page.$x('//button[contains(text(),"Seguindo")]');

  // Iterar sobre os botões "Seguindo" e clicar para deixar de seguir
  for (const button of followButtons) {
    await button.click();
    await page.waitForTimeout(1000); // Aguardar um tempo entre as ações
  }

  // Fechar o navegador
  await browser.close();
}

// Exemplo de uso do bot para deixar de seguir todos os perfis
const username = 'seu_nome_de_usuario';
const password = 'sua_senha';

unfollowAllUsers(username, password)
  .then(() => console.log('Unfollow concluído com sucesso!'))
  .catch((error) => console.error('Erro ao executar o bot:', error));
