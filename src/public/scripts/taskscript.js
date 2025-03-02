
 // Toggle form visibility
 const addTaskButton = document.getElementById('add-task-button');
 const taskForm = document.getElementById('task-form');
 const form = document.getElementById('task-form');
 const messageDiv = document.createElement('div');
 document.body.appendChild(messageDiv);

 addTaskButton.addEventListener('click', () => {
     taskForm.style.display = taskForm.style.display === 'none' ? 'block' : 'none';
 });

 form.addEventListener('submit', function(e) {
     e.preventDefault();

     const formData = new FormData(form);
     const data = Object.fromEntries(formData.entries());

     fetch('/main/tasksadd', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
     })
     .then(response => {
         if (!response.ok) {
             throw new Error('Failed to process request');
         }
         return response.json();
     })
     .then(result => {
     messageDiv.textContent = result.message;
     form.reset();
     taskForm.style.display = 'none';

     // Update the task list dynamically
     // const newTask = document.createElement('li');
     // newTask.textContent = result.task.title;
     // taskList.appendChild(newTask);
     location.reload();
     })

 });