# Step 1: Start from an official Python base image
FROM python:3.11-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the requirements file into the container
COPY requirements.txt .

# Step 4: Install Flask inside the container
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of the app files into the container
COPY . .

# Step 6: Tell Docker which port the app will use
EXPOSE 5000

# Step 7: Tell Docker how to start the app
CMD ["python", "app.py"]