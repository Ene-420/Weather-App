import { bodyContent } from "../function/loader";

const body = document.querySelector("body");

const renderHeader = () => {};

export const renderBody = () => {
  const bodyContent = document.createElement("main");
  bodyContent.classList("content");
  body.appendChild(bodyContent);
};

export const landingPage = () => {
  const landingPageDiv = document.createElement("div");
  const searchBar = document.createElement("input");
  const searchBtn = document.createElement("button");
  const searchIcon = document.createElement("i");

  landingPageDiv.classList.add("landing-page-div");
  searchIcon.classList.add("fa-solid");
  searchIcon.classList.add("fa-magnifying-glass");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("class", "search-bar");
  searchBar.setAttribute("placeholder", "Enter Location Here");
  searchBtn.classList.add('search-btn')

  searchBtn.append(searchIcon);

  landingPageDiv.append(searchBar, searchBtn);

  return landingPageDiv;
};

export const weatherPage = () => {
  //const body = document.querySelector("body");
  const content = document.createElement("div");

  content.classList.add("content");
  const contentBody = document.querySelector(".content");

  const contentForm = document.createElement("div");

  contentForm.classList.add("content-form");

  contentForm.appendChild(bodyContent().render());

  content.appendChild(contentForm);

  return content
}