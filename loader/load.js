const body = document.querySelector("body");

const renderHeader = () => {

};

export const renderBody = () => {
  const bodyContent = document.createElement("main");
    bodyContent.classList("content");
    body.appendChild(bodyContent)
};
