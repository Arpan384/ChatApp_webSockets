const socket=io.connect("http://localhost:1234/");
var message=document.querySelector("#message");
var handle=document.querySelector("#handle");
var btn=document.querySelector("#btn");
var output=document.querySelector("#output");
var feedback=document.querySelector("#feedback");
var confirm=document.querySelector("#confirm");

confirm.addEventListener("click",()=>{
    if(handle.value.trim().length==0)btn.disabled=true;
    else {
        btn.disabled=false;
        document.querySelector("#name").classList.add("hide");
        document.querySelector("#allow").classList.remove("hide");
        document.querySelector("#welcome").innerText="Welcome "+handle.value;
    }
});

btn.addEventListener("click",()=>{ console.log(message.value);
    if(message.value.trim().length==0)return;
    socket.emit("chat",{
        message:message.value,
        handle:handle.value
    });
    message.value="";
});

message.addEventListener("keypress",()=>{
    socket.emit("typing",handle.value);
});

socket.on("rec",(data)=>{
    feedback.innerHTML="";
    output.innerHTML+="<p><strong>"+data.handle+":</strong>"+data.message+"</p>";
});

socket.on("type",(data)=>{
    feedback.innerHTML="<p><em>"+data+" is typing a message...</em></p>"
});