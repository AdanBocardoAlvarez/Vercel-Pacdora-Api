(async () => {
  const langs_category1 = ["boxes", "Boîtes", "الصناديق"];
  const langs_category2 = ["bottles", "Bouteilles", "الزجاجات"];
  const langs_category3 = ["pouches", "Pochettes", "الأكياس"];
  const langs_pre = ["All the ", "Toutes les ", "كلهم "]
  const mockupKey = getQueryValue("key");
  const name = getQueryValue("name");
  let index = 0;
  if(document.querySelector("#languageSwitch").value == "index-fr.html")
    index = 1;
  else if(document.querySelector("#languageSwitch").value == "index-ar.html")
    index = 2;
  document.getElementById("title").innerText = langs_pre[index]+langs_category1[index];
  if(name.toLowerCase() == langs_category2[0])
    document.getElementById("title").innerText = langs_pre[index]+langs_category2[index];
  else if(name.toLowerCase() == langs_category3[0])
    document.getElementById("title").innerText = langs_pre[index]+langs_category3[index];
  const menus = document.querySelectorAll(".header-menu-item");
  if (mockupKey === "box-mockups") {
    menus[1].classList.add("active");
  } else if (mockupKey === "bottle-mockups") {
    menus[2].classList.add("active");
  } else if (mockupKey === "pouch-and-sachet-and-bag--mockups") {
    menus[3].classList.add("active");
  }
  // Get models list
  const result = await fetch(
    `/models?current=1&pageSize=50&mockupNameKey=${mockupKey}`
  ).then((res) => res.json());
  const list = result.data;
  let html = "";
  let templateHtml = "";  
  const languageSwitch = document.querySelector("#languageSwitch");
  let detail_url = "/detail.html"
  if(languageSwitch.value == "index-fr.html")
    detail_url = "/detail-fr.html"
  else if(languageSwitch.value == "index-ar.html")
    detail_url = "/detail-ar.html"
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    html += `
        <a class="list-item" href="${detail_url}?modelId=${item.modelId}">
            <img src="${item.image.replace(
              "cdn.pacdora.com/",
              "cdn.pacdora.com/image-resize/650xauto_outside/"
            )}" />
            <p>${item.showName}</p>
        </a>
    `;
  }
  document.querySelector("#list").innerHTML = html;
})();
