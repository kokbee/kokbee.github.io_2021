var firebaseConfig = {
    apiKey: "AIzaSyBPPs2vC1vuZV3uQKSNWyAqEelZwR2NT0U",
    authDomain: "githubio-b4a77.firebaseapp.com",
    databaseURL: "https://githubio-b4a77-default-rtdb.firebaseio.com",
    projectId: "githubio-b4a77",
    storageBucket: "githubio-b4a77.appspot.com",
    messagingSenderId: "243003904340",
    appId: "1:243003904340:web:abd4b6f3305fa9953cb8c1",
    measurementId: "G-ZZDP4QSF3R"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function boardWhite(){
    let fb= firebase.database()

    // values
    let project = document.getElementById('project').value;
    let technical = document.getElementById('technical').value;
    let start = document.getElementById('startdate').value;
    let end = document.getElementById('enddate').value;
    let team = document.getElementById('team').value;
    let target = document.getElementById('target').value;
    let develop = $('#develop').val();
    let description = $('#description').val();
    let url = document.getElementById('url').value;
    let image = document.getElementById('image').value;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let ts = date+' '+time;

    console.log(develop, description)

    // input
    fb.ref(`board/projects/${project}`).set({
        name:project,
        technical:technical,
        during:{
            "start":start,
            "end":end
        },
        team:team,
        target:target,
        develop:develop,
        description:description,
        url:url,
        ts:ts,
        img:image,
    });

    setTimeout(() => window.location.href='https://kokbee.github.io/index.html',1500);
};


function boardRead(){
    let fb= firebase.database()
    let fbdata;

    fb.ref("board/projects").on("value", function(data){
        fbdata = data.val();
        let sortingData = []

        if (fbdata != null){
            for (let pro in fbdata){
                let temp = {}
                temp['name'] = fbdata[pro]['name'];
                temp['team'] = fbdata[pro]['team'];
                temp['develop'] = fbdata[pro]['develop'];
                temp['description'] = fbdata[pro]['description'];
                temp['target'] = fbdata[pro]['target'];
                temp['technical'] = fbdata[pro]['technical'];
                temp['url'] = fbdata[pro]['url'];              
                temp['ts'] = fbdata[pro]['ts'];
                temp['during'] = fbdata[pro]['during'];
                temp['img'] = fbdata[pro]['img'];
                sortingData.push(temp);
            }
        }

        sortingData.sort(compareData);

        let projectDiv = document.getElementById('projects');

        if (sortingData != null){
            for (let pro in sortingData){
                let proName = null;
                let proTeam = null;
                let proDev = null;
                let proDesc = null;
                let proTraget = null;
                let proTech = null;
                let proUrl = null;
                let proTs = null;
                let proDuring = null;
                let proImage = null;

                proName = sortingData[pro]['name'];
                proTeam = sortingData[pro]['team'];
                proDev = sortingData[pro]['develop'];
                proDesc = sortingData[pro]['description'];
                proTraget = sortingData[pro]['target'];
                proTech = sortingData[pro]['technical'];
                proUrl = sortingData[pro]['url'];              
                proTs = sortingData[pro]['ts'];
                proDuring = sortingData[pro]['during'];
                proImage = sortingData[pro]['img'];  
                
                if (proImage != ""){
                    proImage = `
                    <a class="btn btn-link btn-sm"" data-toggle="modal" data-target="#${proName}Modal">${proName}</a>
                    
                    <div class="modal fade" id="${proName}Modal" tabindex="-1" role="dialog" aria-labelledby="${proName}ModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h5 class="modal-title" id="${proName}ModalLabel">Reference</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <img src="${proImage}" alt="" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        </div>
                    </div>                    
                    `
                }

                if (proUrl != ""){
                    proUrl = `<a href="${proUrl}">${proName}</a>`
                }


                let addDiv = document.createElement('div');
                addDiv.setAttribute('id', `pro_${proName}`)
                addDiv.setAttribute('class',"d-flex flex-column flex-md-row justify-content-between mb-5" )

                let text = `
                    <div class="flex-grow-1">
                        <h3 class="mb-0">${proName}</h3>
                        <li><b>제작 기간</b> : ${proDuring.start} - ${proDuring.end}</li>
                        <li><b>구성원</b> : ${proTeam}</li>
                        <li><b>사용된 기술</b> : ${proTech}</li>
                        <li><b>사용 대상</b> : ${proTraget}</li>
                        <li><b>개발 내용</b>  <div class="card-body">${proDev}</div></li>
                        <li><b>기타 내용</b>  <div class="card-body">${proDesc}</div></li>
                        <li><b>URL</b>  : ${proUrl}</li>
                        <li><b>이미지</b>  :${proImage}</li>
                    </div>
                    <div style="font-size:6px;" >Update : ${proTs}</div>
                `;

                addDiv.innerHTML = text;
                projectDiv.appendChild(addDiv)

            }
        }else{
            return
        }

    })
};


function compareData(data1, data2) {
    let date1 = data1.during.end;
    let date2 = data2.during.end;

    return date1 < date2 ? 1: -1;
}