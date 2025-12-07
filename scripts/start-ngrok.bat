@echo off
REM Script to start ngrok tunnel for webhook testing on Windows

echo 🚀 Starting ngrok tunnel for localhost:3000...
echo.
echo 📋 After ngrok starts, you'll see a URL like:
echo    https://abc123.ngrok-free.app
echo.
echo 📝 Then update your Clerk webhook URL to:
echo    https://abc123.ngrok-free.app/api/webhooks/clerk
echo.
echo Press Ctrl+C to stop ngrok
echo.

ngrok http 3000

