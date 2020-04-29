function progress(){
  var trial = exp.data_trials.length;
	var pct = Math.round(100*(trial + exp.slideIndex+1)/(exp.nQs+1));
	$('.progress-bar').css('width', pct+'%').attr('aria-valuenow', pct);
}

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

  slides.multi_slider = slide({
    name : "multi_slider",

    present : [{
          amb: {mixed: {unemphasized: {every: "Every marble isn't red.", some: "Some marble isn't red.", one: "One marble isn't red.", no: "No marble isn't red."}, emphasized: {every: "<em><strong>EVERY</strong></em> marble isn't red.", some: "<em><strong>SOME</strong></em> marble isn't red.", one: "<em><strong>ONE</strong></em> marble isn't red.", no: "<em><strong>NO</strong></em> marble isn't red."}}, control: {unemphasized: {every: "Every marble isn't red.", some: "Some marble isn't red.", one: "One marble isn't red.", no: "No marble isn't red."}, emphasized: {every: "Every marble isn't red.", some: "Some marble isn't red.", one: "One marble isn't red.", no: "No marble isn't red."}}},
          paraphrase: {surface: {every: "None of the marbles are red.", some: "Not all of the marbles are red.", one: "There's a single marble that isn't red.", no: "All of the marbles are red."}, inverse: {every: "Not all of the marbles are red.", some: "None of the marbles are red.", one: "It's not the case that there's a single red marble.", no: "Some of the marbles are red."}},
        }],

      present_handle : function(stim) {
        $(".err").hide();

        this.stim = stim;
        exp.emph = _.sample(["unemphasized","emphasized"])
        exp.quantifier = _.sample(["every","some","one","no"]);
        exp.condition = _.sample(["control", "mixed", "mixed"]);

        $(".amb").html("\""+stim["amb"][exp.condition][exp.emph][exp.quantifier]+"\"");

        this.sentence_types = _.shuffle(["surface","inverse"]);
        var sentences = {
          "surface": stim.paraphrase["surface"][exp.quantifier],
          "inverse": stim.paraphrase["inverse"][exp.quantifier],
        };

        this.n_sliders = this.sentence_types.length;
        $(".slider_row").remove();
        for (var i=0; i<this.n_sliders; i++) {
          var sentence_type = this.sentence_types[i];
          var sentence = sentences[sentence_type];
          $("#multi_slider_table").append('<tr class="slider_row"><td class="slider_target" id="sentence' + i + '">' + "<font size='4'>" + sentence + "</font>" + '</td><td colspan="2"><div id="slider' + i + '" class="slider">-------[ ]--------</div></td></tr>');
          utils.match_row_height("#multi_slider_table", ".slider_target");
        }

        this.init_sliders(this.sentence_types);
        exp.sliderPost = [];
      },

      button : function() {
        if (exp.sliderPost.length < this.n_sliders) {
          $(".err").show();
        } else {
          this.log_responses();
          _stream.apply(this); //use _stream.apply(this); if and only if there is "present" data.
        }
      },

      init_sliders : function(sentence_types) {
        for (var i=0; i<sentence_types.length; i++) {
          var sentence_type = sentence_types[i];
          utils.make_slider("#slider" + i, this.make_slider_callback(i));
        }
      },
      make_slider_callback : function(i) {
        return function(event, ui) {
          exp.sliderPost[i] = ui.value;
        };
      },
      log_responses : function() {
        for (var i=0; i<this.sentence_types.length; i++) {
          var sentence_type = this.sentence_types[i];
          exp.data_trials.push({
            "trial_type" : "multi_slider",
            "sentence_type" : sentence_type,
            "bottom_slider": i,
            "condition": exp.condition,
            "response" : exp.sliderPost[i],
            "quantifier": exp.quantifier,
            "QUD": exp.QUD,
            "emphasis": exp.emph,
          });
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
          // "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          // "condition" : exp.condition,
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
  repeatWorker = false;
  (function(){
    var ut_id = "intonation-ambiguity-20200406";
    if (UTWorkerLimitReached(ut_id)) {
      $('.slide').empty();
      repeatWorker = true;
      alert("You have already completed the maximum number of HITs allowed by this requester. Please click 'Return HIT' to avoid any impact on your approval rating.");
    }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  exp.condition = _.sample(["control", "mixed", "mixed"]);
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

  // exp.structure=["trial", 'subj_info', 'thanks'];
  exp.structure=["i0", "instructions1", "instructions2", "multi_slider", 'subj_info', 'thanks'];

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
