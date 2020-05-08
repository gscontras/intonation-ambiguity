var t1, t2;

function progress(){
  var trial = exp.data_trials.length/2;
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

  exp.condition = _.sample(["control", "mixed", "mixed"])

  slides.multi_slider = slide({
    name : "multi_slider",
    present : _.shuffle([ {
        quantifier: "Every", surface: "None of the marbles are red.", inverse: "Not all of the marbles are red."
      },
      {
        quantifier: "Some", surface: "Not all of the marbles are red.", inverse: "None of the marbles are red."
      },
      {
        quantifier: "No", surface: "All of the marbles are red.", inverse: "Some of the marbles are red."
      }
    ]),
    present_handle : function(stim) {
      t1 = new Date();
      progress();
      $(".err").hide();

      this.stim = stim;

      $(".amb").html(stim.quantifier);

      exp.emph = _.sample(["unemphasized","emphasized"]);

      // console.log(exp.condition, exp.emph)

      if (exp.condition === "mixed") {
        if (exp.emph === "emphasized") {
          $(".amb").addClass("bic");
        }
        else {
          $(".amb").removeClass("bic");
        }
      }
      else {
        $(".amb").removeClass("bic");
      }

      this.sentence_types = _.shuffle(["surface","inverse"]);

      var sentences = {
        "surface": stim.surface,
        "inverse": stim.inverse,
      };

      this.n_sliders = this.sentence_types.length;

      $(".slider_row").remove();

      for (var i=0; i<this.n_sliders; i++) {
        var sentence_type = this.sentence_types[i];
        var sentence = sentences[sentence_type];
      }

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
        t2 = new Date();
        var rt = ((t2.getTime() - t1.getTime())/100)/10;
        exp.data_trials.push({
          "RT" : rt,
          "sentence_type" : sentence_type,
          "bottom_slider": i,
          "condition": exp.condition,
          "response" : exp.sliderPost[i],
          "quantifier": this.stim.quantifier,
          "emphasis": exp.emph,
        });
      }
    },
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
    var ut_id = "intonation-ambiguity-20200508";
    if (UTWorkerLimitReached(ut_id)) {
      $('.slide').empty();
      repeatWorker = true;
      alert("You have already completed the maximum number of HITs allowed by this requester. For technical reasons we publish experiments in multiple groups. Please click 'Return HIT' to avoid any impact on your approval rating.");
    }
  })();

  exp.trials = [];
  exp.catch_trials = [];
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };

  exp.structure=["i0", "instructions1", "instructions2", "multi_slider", 'subj_info', 'thanks'];

  exp.data_trials = [];

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
