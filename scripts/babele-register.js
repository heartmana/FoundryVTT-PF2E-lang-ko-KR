Hooks.once('init', () => {
		if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'pf2e-ko',
			lang: 'ko',
			dir: 'localization/compendium/ko'
		});

		if (!game.settings.get("pf2e-ko", "show-original-name")) return;
		TranslatedCompendium.prototype.translateOrigin = TranslatedCompendium.prototype.translate;
		TranslatedCompendium.prototype.translate = function(data) {
			let originalName = data.name;
			let translatedData = this.translateOrigin(data);
			if (originalName !== translatedData.name){
				translatedData.name = translatedData.name + ' ' + originalName;
			}
			return translatedData;
		};
		TranslatedCompendium.prototype.i18nNameOrigin = TranslatedCompendium.prototype.i18nName;
		TranslatedCompendium.prototype.i18nName = function(idx) {
			let translated = this.i18nNameOrigin(idx);
			return translated === idx.name ? translated : translated + ' ' + idx.name;
		};
	}
});
