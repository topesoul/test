document.addEventListener('DOMContentLoaded', function() {
    // Define user and room details
    const userName = 'User'; // Normally you would pull this from user session data
    const roomName = 'HomeViseRoom_' + new Date().getTime(); // Unique room name for each session

    // Define options for Jitsi Meet API
    const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#jitsi-iframe-container'),
        userInfo: {
            displayName: userName
        },
        interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: '#ffffff',
            DEFAULT_REMOTE_DISPLAY_NAME: 'Guest',
            TOOLBAR_BUTTONS: [
                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                'security'
            ],
            SETTINGS_SECTIONS: [ 'devices', 'language', 'moderator', 'profile', 'calendar' ]
        },
        configOverwrite: {
            disableSimulcast: false,
            background: '#ffffff'
        }
    };

    // Initialize the Jitsi Meet API
    const api = new JitsiMeetExternalAPI('meet.jit.si', options);

    // Optional: Handle API events as needed
    api.addEventListeners({
        participantLeft: function() {
            console.log('A participant has left the room.');
        },
        videoConferenceJoined: function() {
            console.log('You have joined the video conference.');
        },
        videoConferenceLeft: function() {
            console.log('You have left the video conference.');
        },
        readyToClose: function() {
            console.log('The conference is about to be closed.');
        }
    });
});