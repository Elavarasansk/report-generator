# SmartWorks - KairoHoraAng  

### Step1
    Install Node LTS 12
    Install YARN

### Step2
    git clone http://192.168.41.136/SmartWorks/kairohoraang.git
    yarn install

### Step3
    `ng build --prod=true --buildOptimizer=true`
     Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Step4
    move the `dist/` directory to nginx file serving folder.
    nginx `/` root will point to the `dist/` directory `.html` file.