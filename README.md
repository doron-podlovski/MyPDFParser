<div id="top"></div>

[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/doron-podlovski/MyPDFParser/">
    <img src="https://github.com/doron-podlovski/MyPDFParser/blob/main/Images/Logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">My PDF Parser</h3>

  <p align="center">
   A simple RESTfull Node.JS service to parse PDF
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/doron-podlovski/MyPDFParser/">View Demo</a>
    ·
    <a href="https://github.com/doron-podlovski/MyPDFParser/issues">Report Bug</a>
    ·
    <a href="https://github.com/doron-podlovski/MyPDFParser/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Code a simple service api that accepts a PDF file, supposedly with an applicant's CV, parse it to extract the fields mentioned below, and store it to MongoDB.

Guidelines and notes:

1.  This assignment tries to peek at your design, clean and efficient code skills. In order to focus on this, we merge 2 services into one, as storing to DB should probably be the role of a different service.
2.  Assume the PDF file is valid and not corrupted. No need for input validations.
3.  There are no set rules to how an applicant wrote his CV, so it's up to you how to fetch the relevant information.
4.  The fields to be extracted from the PDF file are email address, Linkedin profile url, mobile phone number and i.d (personal identification number). If any is missing, set it to null.
5.  The data will be stored as a MongoDb document, with a "rawData" field for the whole parsed file, and the other fields in sibling fields as you deem appropriate.  
    
6.  You can use a schema or schema-less approach, but have a reason why you chose it.
7.  While it's up to you to make sure it works, you don't have to supply us with db-connection, and though you can supply a working PDF file, we will try our own.


### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [Node.js](https://nodejs.org/en/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
*Node.JS [Download from Node.JS.org](https://nodejs.org/en/)
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/doron-podlovski/MyPDFParser.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Set an .env file
   ```js
   DB_CONNECTION=mongodb://[Your Mongo server url]
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
After starting, browse the following URL:
```
http://localhost:[App port]
```
The page if for easy access to the application API.

# Limitations 
* This apppliaciton is working <b>only</b> with english based C.V`s 
* The application will upload an hebrew C.V. to the database, but will miss the name of the applicant

# Application API:
```
'/' - Home page, renders the index.ejs file.
```

```
'/ping' - Will display version info acts as ping to the system.
```

```
'/upload' - uploads a pdf file 
```

```
'/files' - get all files stored in the database 
```

```
'/image/:filename' - For future use, for loading applicants pictures for dispaly
```

```
'/doc/:filename' - Gets a document file name and makes it acessable to display
```
```
'/applicant/:filename' - Dispaly the applicant parsed inforamtion
```
```
'file/:id' - Gets a specific file to be deleted.
```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Doron Podlovski - [@Linkedin](https://www.linkedin.com/in/doron-podlovski/) - doron.podlovski@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/doron.podlovski/MyPDFParser?style=for-the-badge
[forks-url]: https://github.com/doron-podlovski/MyPDFParser/issues/network/members
[stars-shield]: https://img.shields.io/amo/stars/st?style=for-the-badge
[stars-url]: https://github.com/doron-podlovski/MyPDFParser/issues/stargazers
[issues-shield]: https://img.shields.io/bitbucket/issues/doron.podlovski/MyPDFParser
[issues-url]: https://github.com/doron-podlovski/MyPDFParser/issues
[license-shield]: https://img.shields.io/apm/l/vim-mode?style=for-the-badge
[license-url]: https://github.com/doron-podlovski/MyPDFParser/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/doron-podlovski/
[product-screenshot]: images/screenshot.png
