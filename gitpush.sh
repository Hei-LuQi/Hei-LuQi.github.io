@echo off
setlocal
set COMMIT_MSG=%1
if "%COMMIT_MSG%"=="" (
    set /p COMMIT_MSG="请输入提交备注: "
)
git add . && git commit -m "%COMMIT_MSG%" && git push
endlocal