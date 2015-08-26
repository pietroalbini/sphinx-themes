var ThemePreferences = {

    get: function(key) {
        var preferences = JSON.parse(localStorage.getItem("theme_preferences"));
        if (preferences === null) {
            preferences = {
                "night": false,
                "fastsearch": false,
            };
        }

        if (key === undefined) {
            return preferences;
        }
        return preferences[key];
    },

    set: function(key, value) {
        var original = this.get();
        original[key] = value;

        localStorage.setItem("theme_preferences", JSON.stringify(original));
        this.apply();
    },

    reset: function() {
        localStorage.removeItem("theme_preferences");
        this.apply();
    },

    enabled: function() {
        return localStorage.getItem("theme_preferences") !== null;
    },

    enable: function() {
        if (this.enabled()) {
            return;
        }

        localStorage.setItem("theme_preferences", JSON.stringify(this.get()));
        this.apply();
    },


    // Main logic

    show_legal: function(next) {
        $(".preferences").hide();
        $(".preferences-legal").attr("data-click-next", next).show();
    },

    apply: function() {
        var preferences = this.get();

        if (preferences.night) {
            $("body").addClass("night");
            $(".preference-night").text("Disable night mode");
        } else {
            $("body").removeClass("night");
            $(".preference-night").text("Enable night mode");
        }

        if (preferences.fastsearch) {
            var settext = function() {
                $(".preference-fastsearch").text("Disable fast search")
                                           .removeClass("disabled");
                $(".search-fastsearch-tip").hide();
            };

            if (ThemeSearch.fastsearch.available()) {
                settext();
                return;
            }

            $(".preference-fastsearch").text("Preparing fast search...")
                                       .addClass("disabled");
            ThemeSearch.fastsearch.enable(settext);
        } else {
            $(".preference-fastsearch").text("Enable fast search");
            $(".search-fastsearch-tip").show();

            if (ThemeSearch.fastsearch.available()) {
                ThemeSearch.fastsearch.disable();
            };
        }
    },

    init: function() {

        if (localStorage === undefined) {
            $(".preferences-error").show();
            $(".preferences").hide();
            $(".preferences-legal").hide();
        } else {
            $(".preferences-legal").hide();

            this.apply();
            $(".preference-night").click(this.callback_night);
            $(".preference-fastsearch").click(this.callback_fastsearch);
            $(".preferences-legal-yes").click(this.callback_legal_yes);
            $(".preferences-legal-no").click(this.callback_legal_no);
        }

    },

    // Callbacks

    callback_night: function(e) {
        e.preventDefault();

        if (ThemePreferences.enabled()) {
            ThemePreferences.set("night", !ThemePreferences.get("night"));
        } else {
            ThemePreferences.show_legal(".preference-night");
        }
    },

    callback_fastsearch: function(e) {
        e.preventDefault();

        if (ThemePreferences.enabled()) {
            ThemePreferences.set("fastsearch", !ThemePreferences.get("fastsearch"));
        } else {
            ThemePreferences.show_legal(".preference-fastsearch");
        }
    },

    callback_legal_yes: function(e) {
        e.preventDefault();
        ThemePreferences.enable();

        var next = $(".preferences-legal").attr("data-click-next");
        if (next !== "") {
            $(next).click();
        }
        $(".preferences-legal").attr("data-click-next", "").hide();
        $(".preferences").show();
    },

    callback_legal_no: function(e) {
        e.preventDefault();
        $(".preferences-legal").attr("data-click-next", "").hide();
        $(".preferences").show();
    },

};
