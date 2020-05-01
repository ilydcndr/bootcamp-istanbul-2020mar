const sendButton = document.getElementsByName('submit')[0];
const searchInput = document.getElementById('search')

sendButton.addEventListener('click', function (e) {
    e.preventDefault()
    let userName = searchInput.value
    let url = `https://api.github.com/search/users?q=${userName}`
    fetch(url)
        .then(Data => Data.json())
        .then(lists => {
            return listUsers(lists)
        }
        )
});

function listUsers(lists) {

    const newUl = document.createElement("ul")
    const userList = document.getElementById('user-list')
    const childofUl = userList.childNodes[1]
    console.log("see 2. ul element", childofUl)
    userList.replaceChild(newUl, childofUl)

    lists.items.forEach(userInfo => {
        const nickName = userInfo.login
        const userImg = userInfo.avatar_url

        const liElementUser = document.createElement('li')
        const imgElement = document.createElement('img')
        const brElement = document.createElement('br')
        const aElement = document.createElement('a')
        const textName = document.createTextNode(` NickName : ${nickName} `)

        liElementUser.classList.add('userInfoSection')
        imgElement.src = `${userImg}`
        imgElement.style.width = "50px"
        imgElement.style.height = "50px"
        aElement.innerHTML = "<span style='color:blue'>See Repos</span>"

        aElement.addEventListener("click", clickRepos.bind(null, event, nickName))
        liElementUser.appendChild(imgElement)
        liElementUser.appendChild(aElement)
        liElementUser.appendChild(textName)

        newUl.appendChild(liElementUser)
        newUl.appendChild(brElement)
    });

}

function clickRepos(event, nickName) {
    console.log(nickName)
    let url = `https://api.github.com/users/${nickName}/repos`
    fetch(url)
        .then(Data => Data.json())
        .then(reposInfos => {
            return getRepos(reposInfos)
        })
}

function getRepos(reposInfos) {
    const newUl = document.createElement("ul")
    const ulElementRepo = document.getElementById('repos-list');
    const childUl = ulElementRepo.childNodes[1];
    ulElementRepo.replaceChild(newUl, childUl)

    if (reposInfos.length > 0) {
        reposInfos.forEach(reposInfo => {
            const repoName = reposInfo.name
            const liElementRepo = document.createElement('li')
            newUl.appendChild(liElementRepo)
            newUl.style.listStyleType = "square"
            liElementRepo.appendChild(document.createTextNode(`${repoName}`))

        })
    }
    else {
        newUl.innerHTML = "doesn't have any repo"

    }
}