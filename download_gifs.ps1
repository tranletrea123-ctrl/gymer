$exercises = @{
    "pushup.gif" = "https://upload.wikimedia.org/wikipedia/commons/8/87/Pushups.gif"
    "squat.gif" = "https://upload.wikimedia.org/wikipedia/commons/5/5a/Squats_01.gif"
    "crunch.gif" = "https://upload.wikimedia.org/wikipedia/commons/0/0c/Sit-ups_or_Crunch.gif"
    "lunge.gif" = "https://upload.wikimedia.org/wikipedia/commons/3/30/Lunge-CDC_strength_training_for_older_adults.gif"
    "jumpingjack.gif" = "https://upload.wikimedia.org/wikipedia/commons/2/25/Jumping_jack_Animation.gif"
}

New-Item -ItemType Directory -Force -Path "d:\gymer\public\exercises" | Out-Null
foreach ($key in $exercises.Keys) {
    $url = $exercises[$key]
    $dest = "d:\gymer\public\exercises\$key"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest
        Write-Host "Downloaded $key"
    } catch {
        Write-Host "Failed to download $key"
    }
}
