<h1 align="center">🐾 Pet Smart Feeder 2.0 🐾</h1>

![GitHub language count](https://img.shields.io/github/languages/count/juxxnn/Smart-Feeder-Pet-project?color=%23a2d2ff)
![GitHub repo size](https://img.shields.io/github/repo-size/juxxnn/Smart-Feeder-Pet-project?color=%23ffc8dd)
![GitHub license](https://img.shields.io/github/license/juxxnn/Smart-Feeder-Pet-project?color=%23caffbf)

Repositório destinado ao Projeto Integrador V do curso de Engenharia da Computação.

## 📝 Descrição do Projeto

O **Pet Smart Feeder 2.0** é um sistema inteligente e amigável projetado para monitorar os hábitos alimentares dos seus animais de estimação! Utilizando tecnologia RFID, ele detecta quando um pet específico se aproxima do comedouro, registrando esses eventos e exibindo informações em tempo real em uma interface web fofa e colorida.

Este projeto visa oferecer aos donos de pets uma maneira fácil e visual de entender:
*   **Quando** seus pets estão acessando a comida.
*   **Com que frequência** eles se aproximam.
*   **Quais pets** estão utilizando o comedouro no momento.

## ✨ Funcionalidades Principais

*   ✔️ **Detecção de Proximidade via RFID:** Identifica pets individualmente através de tags RFID.
*   ✔️ **Monitoramento de Status Ao Vivo:** Mostra quais pets estão atualmente perto ("Check In") ou longe ("Check Out") do comedouro.
*   ✔️ **Histórico Detalhado:** Registra todos os eventos de "Check In" e "Check Out" em uma tabela organizada.
*   ✔️ **Exportação de Dados:** Permite exportar o histórico de aproximações para um arquivo CSV.
*   ✔️ **Interface Web Fofa e Responsiva:** Um dashboard web colorido, com design moderno e adaptável a diferentes tamanhos de tela.

## 💻 Tecnologias Utilizadas

*   **Frontend (Interface Web):**
    *   HTML5
    *   CSS3 (com variáveis, Flexbox)
    *   Bootstrap 4 (para estrutura e componentes responsivos)
    *   JavaScript (ES6+)
    *   jQuery (para manipulação do DOM e DataTables)
    *   DataTables.js (para criar tabelas interativas e com exportação)
    *   Font Awesome 5 (para ícones)
    *   Google Fonts (Nunito)
*   **Backend (Base de Dados):**
    *   Firebase Realtime Database (para armazenamento e sincronização de dados em tempo real)
*   **Hardware (Não incluído neste repositório):**
    *   Microcontrolador 
    *   Leitor RFID 
    *   Tags RFID (para coleira dos pets)

## 👥 Equipe do Projeto

Este projeto foi desenvolvido com carinho por:

*   Felipe de Miranda Barbosa 
*   Jose Adalberto Lucas Lima 
*   Juliana Tadeu da Silva 
*   Luciana Lopez da Silva 
*   Ricardo Pedro Ferreira 
*   Rodrigo de Sousa Cobra D’eça 
*   Telma Tiemi Ito 
*   Yves Danillo Bocutti 


## 🚀 Pré-requisitos (Para rodar o Frontend)

*   Um navegador web moderno (Chrome, Firefox, Edge, etc.).
*   [Git](https://git-scm.com/) instalado para clonar o repositório.
*   **Um servidor web local** para servir os arquivos HTML/CSS/JS. Isso é necessário porque o JavaScript faz requisições (ao Firebase ou dados mocados) que não funcionam abrindo o `index.html` diretamente do seu sistema de arquivos (devido a políticas de segurança CORS). As opções mais fáceis são:
    *   **VS Code com a extensão "Live Server"** (Recomendado).
    *   **Python 3 instalado:** Para usar o servidor HTTP embutido.

## ▶️ Como Rodar o Projeto (Frontend)

Siga estas etapas para visualizar a interface web em seu computador:

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/juxxnn/Smart-Feeder-Pet-project.git
    cd Smart-Feeder-Pet-project # Navegue até a pasta clonada
    cd attendance-system # Entre na pasta principal do frontend
    ```

2.  **Inicie um Servidor Web Local:**

    *   **Opção 1: VS Code + Live Server (Mais Fácil)**
        1.  Abra a pasta `attendance-system` no Visual Studio Code.
        2.  Instale a extensão "Live Server" (por Ritwick Dey) se ainda não tiver.
        3.  Clique com o botão direito no arquivo `index.html`.
        4.  Selecione "Open with Live Server". Seu navegador abrirá automaticamente com a página.

    *   **Opção 2: Usando Python 3**
        1.  Abra seu terminal ou prompt de comando.
        2.  **Certifique-se** de estar dentro da pasta `attendance-system`.
        3.  Execute o comando:
            ```bash
            python -m http.server
            ```
        4.  Abra seu navegador e acesse o endereço `http://localhost:8000` (ou o endereço que o terminal indicar).

## 🧪 Simulação de Dados (Sem Hardware)

Atualmente, o `script.js` está configurado para usar **dados mocados (simulados)**, permitindo testar e visualizar a interface sem o hardware ou Firebase configurado.

Se você quiser **testar com o Firebase real** (e simular o hardware):

1.  **Configure o Firebase:** Certifique-se de que o projeto Firebase (`smartfeederv2-8aa84`) existe e que as credenciais no `index.html` estão corretas.
2.  **Acesse o Firebase Console:** Vá para [console.firebase.google.com](https://console.firebase.google.com/).
3.  **Realtime Database:** Navegue até o banco de dados do seu projeto.
4.  **Adicione/Modifique Dados Manualmente:**
    *   **Status Ao Vivo:** No nó `/users`, adicione entradas como `"NomeDoPet": 1` (perto) ou `"NomeDoPet": 0` (longe).
    *   **Histórico:** No nó `/attendence`, adicione novos objetos com a estrutura: `{ "uid": "NomeDoPet", "id": "ComedouroID", "time": "TIMESTAMP_ISO", "status": true/false }`. Use `new Date().toISOString()` para obter um timestamp atual.
5.  **Altere o `script.js`:** Siga os comentários no final do arquivo `script.js` para:
    *   Descomentar `firebase.initializeApp(config);`.
    *   Comentar a chamada inicial `processData(mockUsersData, mockAttendanceData);`.
    *   Comentar o listener do botão de simulação.
    *   Descomentar o bloco do listener `firebase.database().ref('/').on('value', ...);`.

## ✨ Exportar Dados

A tabela de histórico possui um botão **"Exportar CSV"** (gerado pela biblioteca DataTables) que permite baixar os dados exibidos na tabela em formato CSV.

## 📄 Licença

Este repositório está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes (se você tiver um).

---

## ⭐ Gostou do Projeto?

Deixe uma estrelinha para nos motivar! ✨
