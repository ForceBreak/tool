<template>
  <div class = "plane" style="left: 90px; top: 40px; width: 480px; height: 270px;">
    <div class = "a"></div>
    <div class = "b"></div>
    <div class = "c"></div>
    <div class = "d"></div>
    <iframe class="yt" sandbox="allow-scripts allow-same-origin" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" width="100%" height="100%" :src="'https://www.youtube.com/embed/' + video_id + '?start=' + timestamp +'&cc_load_policy=1&amp;iv_load_policy=3&amp;controls=0&amp;playsinline=1&amp;rel=0&amp;modestbranding=1&amp;autoplay=1&amp;origin=https%3A%2F%2Fwe;enablejsapi=1&amp;widgetid=1'" id="widget2"></iframe>
  </div>
</template>

<script>
export default {
  name: 'video',
  computed: {
    video_id () { return this.$store.state.search.pictureInPicture.activeVideo },
    timestamp () { return this.$store.state.search.pictureInPicture.timestamp }
  },
  mounted: () => {
    let right;
    let bottom;

    let focus;
    let textarea;
    let mouseDown;

    const minWidth = 320;
    const minHeight = 180;

document.addEventListener("mousedown", event => {
  focus = null;

  let element = document.elementFromPoint(event.clientX, event.clientY);
  
  if(element.className.includes("plane")){
    Array.from(document.getElementsByClassName("plane")).forEach(element => {
      element.style.zIndex = "0";
    });
    
    focus = element;
    focus.style.zIndex = "1";
    focus.tabIndex = "1";
    mouseDown = true;
  }else{
    let parentElement = element.parentElement;
  
    if(parentElement){
      if(parentElement.className.includes("plane")){
        let rect = parentElement.getBoundingClientRect();
        right = rect.right;
        bottom = rect.bottom;
                
        Array.from(document.getElementsByClassName("plane")).forEach(element => {
          element.style.zIndex = "0";
        });
      
        focus = element;
        parentElement.style.zIndex = "1";
        parentElement.tabIndex = "1";
        mouseDown = true;
        
        console.log(focus)
      }
    }
  }
});

document.addEventListener("mousemove", event => {
  if(focus && mouseDown){
    if(focus.className.includes("plane")){
      focus.style.left = event.clientX - focus.offsetWidth / 2 + "px";
      focus.style.top = event.clientY - focus.offsetHeight / 2 + "px";
    } else {
      let parentElement = focus.parentElement;
    
      switch(focus.className){
        case "a":
                    
          if(right - event.clientX >= minWidth){
            parentElement.style.left = event.clientX + "px";
          }
        
          if(bottom - event.clientY >= minHeight) {
            parentElement.style.top = event.clientY + "px";
          }

          parentElement.style.width = right - parentElement.offsetLeft + "px";
          parentElement.style.height = bottom - parentElement.offsetTop + "px";
          break;
        case "b":
          if(bottom - event.clientY >= minHeight){
            parentElement.style.top = event.clientY + "px";
          }
        
          if(event.clientX - parentElement.offsetLeft >= minWidth){
            parentElement.style.width = event.clientX - parentElement.offsetLeft + "px";
          }

          parentElement.style.height = bottom - parentElement.offsetTop + "px";
          break;
        case "c":
          if(right - event.clientX >= minWidth){
            parentElement.style.left = event.clientX + "px";
          }
        
          parentElement.style.width = right - parentElement.offsetLeft + "px";
        
          if(event.clientY - parentElement.offsetTop >= minHeight){
            parentElement.style.height = event.clientY - parentElement.offsetTop + "px";
          }
          break;
        case "d":
          if(event.clientX - parentElement.offsetLeft >= minWidth){
            parentElement.style.width = event.clientX - parentElement.offsetLeft + "px";
          }
        
          if(event.clientY - parentElement.offsetTop >= minHeight){
            parentElement.style.height = event.clientY - parentElement.offsetTop + "px"; 
          }
          break;
      } 
    }
  }
});

document.addEventListener('mouseup', () => {
  if(focus){
    let element = focus.className.includes("plane") ? focus : focus.parentElement;
    
    Array.from(element.children).forEach(children => {
      if(children.tagName === "TEXTAREA"){
        textarea = children;
        textarea.disabled = false;
        textarea.focus();
      }
    });
    
    mouseDown = false;
  }
});

document.addEventListener('keyup', () => {
  if(focus && textarea){
    let element = focus.className.includes("plane") ? focus : focus.parentElement;
  
    Array.from(element.children).forEach(children => {
      if(children.tagName === "PRE"){
        children.innerHTML = textarea.value;
      }
    });
  }
});
  }

}
</script>

<style lang="scss" scoped>
.plane {
  position: absolute;
  background: #0d0d0d;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px #777;
  color: white;
  outline: none;
  cursor: all-scroll;
}

.plane a {
  text-decoration: none;
  pointer-events: auto;
  color: white;
}

.plane ::selection {
  background: transparent;
}

.plane .a, .plane .b, .plane .c, .plane .d {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
}

.plane .a {
  cursor: nwse-resize;
  left: 0;
  top: 0;
}

.plane .b {
  cursor: nesw-resize;
  left: 100%;
  top: 0;
}

.plane .c {
  cursor: nesw-resize;
  left: 0;
  top: 100%;
}

.plane .d {
  cursor: nwse-resize;
  left: 100%;
  top: 100%;
}

.yt {
  pointer-events: none;
  border-radius: 10px;
}
</style>

