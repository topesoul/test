document.addEventListener('DOMContentLoaded', function() {
    const userName = 'User'; 
    const roomName = 'HomeVise_' + new Date().getTime(); // Generate room name

    const iframe = document.getElementById('jitsi-iframe');
    iframe.src = `https://meet.jit.si/${roomName}#userInfo.displayName="${userName}"`;
});
