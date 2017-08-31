let app = new Vue({
    el: '#app',
    data: {
        affirmations: [],
        microm: new Microm(),
        status: "Affirmation Recorder",
        mixPlay: false,
        autoPlay: false,
        playRandom: false
    },
      computed:{
      reversedList:function(){
      	return this.affirmations.slice().reverse();
      }
    }
  });

