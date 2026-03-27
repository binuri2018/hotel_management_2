# How to Install Maven on Windows

Since Maven is not installed on your system, here are the steps to install it:

## Option 1: Manual Installation (Recommended)

1. **Download Maven**
   - Go to: https://maven.apache.org/download.cgi
   - Download: `apache-maven-3.9.5-bin.zip` (or latest version)

2. **Extract the Archive**
   - Extract to: `C:\Program Files\Apache\maven` (or your preferred location)

3. **Set Environment Variables**
   - Open System Properties → Environment Variables
   - Add new System Variable:
     - Variable name: `MAVEN_HOME`
     - Variable value: `C:\Program Files\Apache\maven`
   - Edit `Path` variable and add: `%MAVEN_HOME%\bin`

4. **Verify Installation**
   - Open a NEW command prompt
   - Run: `mvn --version`

## Option 2: Using Chocolatey (If Installed)

```powershell
choco install maven
```

## Option 3: Using Scoop (If Installed)

```powershell
scoop install maven
```

## After Installation

Once Maven is installed, navigate to the backend directory and run:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

---

**Note**: You may need to restart your terminal/IDE after installing Maven for the PATH changes to take effect.
