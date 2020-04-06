var t1, t2;

var utterance = ["amb", "surface", "inverse"]

function make_slides(f) {
  var   slides = {};

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions1 = slide({
    name : "instructions1",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.instructions2 = slide({
    name : "instructions2",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.trial = slide({
        name : "trial",

        present : _.shuffle([ {
                    utterance: "amb",
                    every: "Every marble isn't red.", some: "Some marble isn't red.", one: "One marble isn't red.", no: "No marble isn't red."
                    },
                  {
                    utterance: "surface",
                    every: "None of the marbles are red.", some: "Not all of the marbles are red.", one: "Exactly two of the marbles are red.", no: "All of the marbles are red."
                  },
                  {
                    utterance: "inverse",
                    every: "Not all of the marbles are red.", some: "None of the marbles are red.", one: "It's not true that exactly one marble is red.", no: "Some of the marbles are red."
                  }
        ])
        ,



        present_handle: function(stim) {
          t1 = new Date();

          $(".sentence").html("\""+stim[exp.condition]+"\"");

          var shuffleImages = _.shuffle(["surface","inverse"]);

          var leftImage = "<img src=\"../1a/expt-files/images/" + stim.utterance + exp.condition + shuffleImages[0] + ".png\" class=\"image\"></img>";
          var rightImage = "<img src=\"../1a/expt-files/images/" + stim.utterance + exp.condition + shuffleImages[1] +".png\" class=\"image\"></img>";

          $("#Image1").html(leftImage);
          $("#Image2").html(rightImage);

          for (var i=0; i<2; i++) {
            var label = 'Image'+(i+1);
          //  var set = stim[label];
          var version = shuffleImages[i]
          $("#"+ label).hover(function(){
                                        $(this).fadeTo(10,0.5);
                                        },
                                        function(){
                                        $(this).fadeTo(10,1);
                                        });
          $("#"+ label).click(function(choice) {
              return function() {
                $(".picture").unbind("click");
                $(".picture").empty();
                t2 = new Date();
                var rt = Math.round((t2.getTime() - t1.getTime())/100)/10;
                exp.data_trials.push({
                  "choice": choice,
                  "rt": rt,
                  //"choice": $(this).attr('id'),
                  "utterance": stim.utterance,
                  "modifier": exp.condition
                });
                setTimeout(function(){
                _stream.apply(_s);
              }, 1000);
              }
            }(version));
          }
        },

        button : function() {
          exp.go();
        }
      });


  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
        // problems: $("#problems").val(),
        // fairprice: $("#fairprice").val()
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["every","some","one","no"]);
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  //exp.structure=["trial",'thanks'];

  exp.structure=["i0", "instructions1", "instructions2", "trial", 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}
