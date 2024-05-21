# EvilCrow RF Control

![GitHub repo size](https://img.shields.io/github/repo-size/marceloapd/evil-crow-rf-control?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/marceloapd/evil-crow-rf-control?style=for-the-badge)

![EvilCrow RF Control](https://img.wattpad.com/d47da3ae0c5f93fa9293a4aa5d908d8027dc86fd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6f583859356e58354763706949513d3d2d3832353732323434332e313565386231323865646463613464353238323339323033353739342e676966)

## Descrição

O EvilCrow RF Control é um projeto que utiliza o [EvilCrow RF v2](https://github.com/h-RAT/EvilCrowRF_Custom_Firmware_CC1101_FlipperZero) com um firmware personalizado para controlar a abertura do portão do condomínio aonde eu moro. Este projeto permite que minhas visitas possam abrir o portão remotamente através de mensagens específicos enviados por WhatsApp.

## Requisitos

Antes de executar o projeto, certifique-se de que você tenha os seguintes requisitos instalados:

- Node.js
- Pacotes Node.js listados em `package.json`
- Dispositivo EvilCrow RF v2 com [Custom Firmware](https://github.com/h-RAT/EvilCrowRF_Custom_Firmware_CC1101_FlipperZero)
- Antena externa compatível, como a Nagoya UT106UV com base magnética
- Conta do WhatsApp ativa para utilizar o cliente de mensagens

## Configuração

1. Clone o repositório em \Documentos:

```
git clone https://github.com/marceloapd/evil-crow-rf-control.git
```

2. Navegue para o diretório do projeto:

```
cd evil-crow-rf-control
```

3. Instale as dependências Node.js usando npm:

```
npm install
```

4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias, incluindo as credenciais do WiFi e as URLs do dispositivo EvilCrow RF. Exemplo:

    ```
    WIFI_SSID=nome_da_rede_wifi
    WIFI_PASSWORD=senha_da_rede_wifi
    DEVICE_URL=url_do_dispositivo_evilcrow_rf
    RAW_SIGNAL=sinal_bruto_para_abrir_o_portao
    AUTHORIZED_PHONES: 556100000000@c.us
    ```

5. Adicione `start_evil-crow-rf-control.bat` à pasta de inicialização do Windows para garantir que o script seja executado automaticamente ao iniciar o sistema. O arquivo `.bat` deve ser colocado em `%AppData%\Microsoft\Windows\Start Menu\Programs\Startup`.

## Uso

1. Ao executar o projeto, ele tentará conectar-se à rede WiFi utilizando as credenciais fornecidas.
2. Aguarde até que o projeto esteja conectado à rede WiFi e pronto para receber comandos.
3. Envie mensagens específicas para o cliente de mensagens associado ao projeto para controlar a abertura do portão do condomínio.
    - Envie "open gate" para abrir o portão através de um sinal bruto.
    - Envie "open file" para abrir o portão através de um sinal de arquivo.
    - Envie comandos iniciados por "jammer" para ativar ou desativar o "jammer" em determinadas frequências.

## Extras

- Este projeto oferece flexibilidade para personalizar e expandir suas funcionalidades de acordo com as necessidades específicas do controle do portão do condomínio.
- Certifique-se de operar este sistema de acordo com as políticas e regulamentos do seu condomínio para garantir a segurança e a privacidade de todos os residentes.

## Autor

Este projeto foi desenvolvido por [Marcelo Assis] e está disponível sob a licença [Licença]. Entre em contato através do seu email para mais informações.
