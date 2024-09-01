(async () => {
  try {
    // Request to obtain Pacdora categories and display them on the page
    const result = await fetch(`/ctree`).then((res) => res.json());
    let html = "";
    const languageSwitch = document.querySelector("#languageSwitch");
    let category_url = "/category.html"
    if(languageSwitch.value == "index-fr.html")
      category_url = "/category-fr.html"
    else if(languageSwitch.value == "index-ar.html")
      category_url = "/category-ar.html"
    for (let i = 0; i < result.data.length; i++) {
      const item = result.data[i];
      html += `
        <a class="category-item" href="${category_url}?key=${item.mockupNameKey}&name=${item.name}">
            <div class="category-name">${item.name}</div>
            <img src="${item.homeConfig.imgSrc}" class="category-image"/>
        </a>
    `;
    }
    const box = document.getElementById("category-box");
    box.innerHTML = html;
    // Pacdora categories GUI end

    // Request to obtain the list of pre-designed templates and display them on the page
    const templateResult = await fetch("/templates").then((res) => res.json());
    let templateHtml = "";
    let detail_url = "/detail.html"
    if(languageSwitch.value == "index-fr.html")
      detail_url = "/detail-fr.html"
    else if(languageSwitch.value == "index-ar.html")
      detail_url = "/detail-ar.html"
    for (let i = 0; i < templateResult.data.length; i++) {
      const item = templateResult.data[i];
      templateHtml += `
      <a class="list-item" href="${detail_url}?templateId=${item.templateId}">
        <img
          src="${item.cover.replace(
            "cdn.pacdora.com/",
            "cdn.pacdora.com/image-resize/650xauto_outside/"
          )}"
        />
      </a>
    `;
    }
    const templateBox = document.getElementById("templates-box");
    templateBox.innerHTML = templateHtml;
    // Pre-designed templates GUI end
  } catch (e) {}
})();
