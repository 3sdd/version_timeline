

function loadJson(path,callback){
    fetch(path)
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            console.log(json);
            processJson(json);

            if(callback!=null){
                callback();
            }
        });
}

function processJson(json){
    if(!"content" in document.createElement("template")){
        return;
    }

    const releases=json.data.repository.releases;
    console.log(releases);

    //TODO: 時間でソートする

    for(const release of releases.edges){
        const template=document.querySelector("#templateTimelineBlock");
        let clone=document.importNode(template.content,true);
        

        // contents=release.sort(function(a,b){
        //     return a
        // })

        const tagName=release.node.tagName;
        const publishedAt=release.node.publishedAt;
        const name=release.node.name;
        const url=release.node.url;

        let date=new Date(publishedAt).toLocaleString({ timeZone: 'Asia/Tokyo' });

        $(clone).find(".timelineTitle").text(tagName);
        $(clone).find(".timelineContent").text(name);
        $(clone).find(".timelineShortDescription").html(release.node.shortDescriptionHTML);
        $(clone).find(".cd-timeline__date").text(date+" JST");
        $(clone).find(".timelineReleaseLink")
            .attr("href",url)
            .text(url);
        
        console.log(release.node.isPrerelease)
        let prereleaseText="";
        if(release.node.isPrerelease){
            prereleaseText="プレリリース"
        }
        $(clone).find(".timelinePrerelease").text(prereleaseText)

        $("#timelineContainer").append(clone);
    }





}