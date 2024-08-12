const api = "https://api.github.com/users/manikmaity";

//refrence of html element 
const searchBoxEle = document.getElementById("search");
const profileImageEle = document.querySelector(".profile-image");
const profileNameEle = document.querySelector(".profile-name");
const profileBio = document.querySelector(".bio");
const statsEles = document.querySelectorAll(".stats p");
const repoLinkEle = document.querySelectorAll(".recent-repo a");
const searchForm = document.getElementById("searchForm");

const getGithubDetails = async (userName) => {
    try{
        const jsondata = await fetch(`https://api.github.com/users/${userName}`)
        const data = await jsondata.json();
        const repoApi = data?.repos_url;
        const repoDataJson = await fetch(`${repoApi}`);
        const repoData = await repoDataJson.json();
        let repoNameAndLink = [];
        repoData.forEach(repo => {
            let repoObj = {};
            repoObj.url = repo.html_url;
            repoObj.name = repo.name;
            repoNameAndLink.push(repoObj);
        })
        if (repoNameAndLink.length > 5){
            repoNameAndLink = repoNameAndLink.slice(0, 5);
        }
        
        const requiredData = {
            name : data?.name,
            bio : data?.bio,
            url : data?.avatar_url,
            stats : {
                followers : data?.followers,
                followings : data?.following,
                repos : data?.public_repos,
            }
        };

    insertProfileData(requiredData);
    console.log(requiredData);

    }
    catch(err){
        console.log(err);
        alert("Unable to get the profile");
    }
}


function insertProfileData (data = {}){
    profileNameEle.textContent = data?.name || "Unknown";
    profileBio.textContent = data?.bio || "No bio is available";
    profileImageEle.src = `${data?.url}` || "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=";
    statsEles[0].textContent = `${data?.stats.followers} followers`;
    statsEles[1].textContent = `${data?.stats.followings} followings`;
    statsEles[2].textContent = `${data?.stats.repos} repos`;

}


searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = searchBoxEle.value;
    if (searchText == ""){
        alert("Please enter github profile name");
        return;
    }
    getGithubDetails(searchText);
})

