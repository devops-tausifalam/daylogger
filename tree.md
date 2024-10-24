# html-tree-structure (temporary for developmental use)

```
html
├── head
│   ├── title: DayLogger
│   ├── meta: viewport (width=device-width, initial-scale=1.0)
│   ├── link: appTheme (stylesheet, href="lib/theme/beach_bath.css", type="text/css")
│   └── link: font-awesome stylesheet (href="https://cdnjs.cloudflare.com/.../all.min.css")
├── body
│   └── div.main-wrapper
│       ├── section.upper-wrap-main
│       │   └── div#ground-floor
│       │       ├── div.upper-shed
│       │       │   └── h1: Under Construction
│       │       ├── button#theme-switch-btn: theme-switch
│       │       └── div.sheet-container#sheet-container
│       │           ├── div.log-sheet
│       │           │   └── div.data-embed
│       │           │       ├── p#fetch-dateTime: -22-10-2024 / 12:03 PM
│       │           │       ├── hr.break
│       │           │       ├── div.thumb
│       │           │       └── p#log-data: Lorem Ipsum...
│       │           └── div.log-sheet (same structure as above)
│       ├── section#bottom-wrap-main
│       │   └── div.log-input
│       │       ├── button#log-upload
│       │       │   └── i.fas.fa-images
│       │       ├── input#log-iField (autocomplete="off", placeholder="Type Something...", type="text")
│       │       └── button#log-send (onclick="logSave()")
│       │           └── i.fas.fa-paper-plane
│       ├── div.modal-base#modal-base
│       │   ├── button#close-modal: exit
│       │   └── div.modal-main
│       │       ├── input (type="url", placeholder="Image URL", id="log-uImage")
│       │       ├── h4: OR
│       │       ├── label#drop-area (for="log-localimage")
│       │       │   ├── input#log-localimage (type="file", accept="image/*", hidden)
│       │       │   └── div#image-view
│       │       │       └── i.fa-solid.fa-cloud-arrow-up
│       │       │       └── p: drag and drop or click to upload image (16:9 preferred)
│       └── script (src="lib/app_daylogger.js")
```
# javascript tree structure (developmental purpose)
```
logSave()
├── var logDate = new Date;
├── JSONdate
│   ├── date: logDate.getDate()
│   ├── day: logDate.getDay()
│   ├── year: logDate.getFullYear()
│   ├── month: logDate.getMonth() + 1
│   ├── hour: logDate.getHours()
│   ├── minutes: logDate.getMinutes()
│   └── seconds: logDate.getSeconds()
├── var fetch_embed = document.getElementById("fetch-dateTime")
├── var fulltimeStamp = "-" + JSONdate.date + "/" + JSONdate.month + "/" + JSONdate.year + ", " + JSONdate.hour + ":" + JSONdate.minutes + ":" + JSONdate.seconds
├── fetch_embed.innerText = fulltimeStamp
├── var embed_text = document.getElementById("log-iField").value
├── var embed_here = document.getElementById("log-data")
└── var JSON_log
    ├── stamp: fulltimeStamp
    └── message: embed_text

uploadImage()
├── var imgLink = URL.createObjectURL(inputFile.files[0])
├── imageView.style.backgroundImage = `url(${imgLink})`
├── var insideElement = document.querySelectorAll("#image-view i, #image-view p")
├── insideElement.forEach(elements)
│   └── elements.style.opacity = "0"
└── document.querySelector("#image-view").style.border = "none"

closeModal (event listener on #close-modal)
├── document.getElementById("modal-base").style.display = "none"
├── document.getElementById("ground-floor").style.display = "block"
└── document.getElementById("bottom-wrap-main").style.display = "block"

openModal (event listener on #log-upload)
├── document.getElementById("modal-base").style.display = "block"
├── document.getElementById("ground-floor").style.display = "none"
└── document.getElementById("bottom-wrap-main").style.display = "none"

switchTheme (event listener on #theme-switch-btn)
├── var appTheme = document.getElementById("appTheme")
├── JSONtheme
│   ├── cotton_candy: "lib/theme/cotton_candy.css"
│   ├── beach_bath: "lib/theme/beach_bath.css"
│   └── winter: "lib/theme/winter.css"
├── const themes = Object.values(JSONtheme)
└── currentThemeIndex = (currentThemeIndex + 1) % themes.length
    └── appTheme.href = themes[currentThemeIndex]

```
