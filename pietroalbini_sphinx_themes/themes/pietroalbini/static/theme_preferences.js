var ThemePreferences = {

    _key: (function() {
        return "theme_preferences_"+DOCUMENTATION_OPTIONS.PROJECT;
    })(),

    get: function(key) {
        var preferences = JSON.parse(localStorage.getItem(this._key));
        if (preferences === null) {
            preferences = {
                "night": false,
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

        localStorage.setItem(this._key, JSON.stringify(original));
        this.apply();
    },

    toggle: function(key) {
        var original = this.get();
        original[key] = !original[key];

        localStorage.setItem(this._key, JSON.stringify(original));
        this.apply();
    },

    reset: function() {
        localStorage.removeItem(this._key);
        this.apply();
    },

    enabled: function() {
        return localStorage.getItem(this._key) !== null;
    },

    enable: function() {
        if (this.enabled()) {
            return;
        }

        localStorage.setItem(this._key, JSON.stringify(this.get()));
        this.apply();
    },


    // Main logic

    show_legal: function(next) {
        $(".preferences").hide();
        $(".preferences-legal").attr("data-click-next", next).show();
    },

    apply: function(light_apply) {
        if (localStorage === undefined) {
            $(".preferences-error").show();
            $(".preferences").hide();
            $(".preferences-legal").hide();

            return;
        }

        var preferences = this.get();

        var light = light_apply !== undefined;

        $(".preferences-legal").hide();
        if (preferences.night) {
            $("body").addClass("night");
            $(".preference-night").text("Disable night mode");
        } else {
            $("body").removeClass("night");
            $(".preference-night").text("Enable night mode");
        }
    },

    init: function() {

        if (ThemeSinglePage.enabled) ThemeSinglePage.onload(function() {
            this.apply();
        }.bind(this));

        if (localStorage !== undefined) {
            this.apply();
            $(window).on("storage", this.callback_external_update);
            $(".preference-night").click(this.callback_night);
            $(".preferences-legal-yes").click(this.callback_legal_yes);
            $(".preferences-legal-no").click(this.callback_legal_no);
        }

    },

    // Callbacks

    callback_external_update: function(e) {
        if (e.key === this._key) {
            // This will apply the new changes in light mode
            // Light mode means no changes which can affect other tabs will be
            // executed
            ThemePreferences.apply(true);
        }
    },

    callback_night: function(e) {
        e.preventDefault();

        if (ThemePreferences.enabled()) {
            ThemePreferences.toggle("night");
        } else {
            ThemePreferences.show_legal(".preference-night");
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
