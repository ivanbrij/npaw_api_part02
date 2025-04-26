const player = videojs('my-player');
let analyticsOptions = {
    'userId': 'jorge.barrera'
};
let npawPlugin = new NpawPlugin('powerce');
npawPlugin.setAnalyticsOptions(analyticsOptions);
npawPlugin.productAnalytics.initialize({
    'autoTrackNavigation':   true,
    'autoTrackAttribution':  true,
    'highlightContentAfter': 1000,
    'pageRules':             []
});
npawPlugin.registerAdapter(player, 'http://localhost:3000/adapter');