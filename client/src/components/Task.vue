
<template>
  <div v-if="currentTask" class="edit-form">
    <h4>Task</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTask.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTask.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTask.published ? "Complete" : "Incomplete" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentTask.published"
      @click="updatePublished(false)"
    >
      Incomplete
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Complete
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteTask"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateTask"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Task...</p>
  </div>
</template>

<script>
import TaskDataService from "../services/TaskDataService";

export default {
  name: "task",
  data() {
    return {
      currentTask: null,
      message: ''
    };
  },
  methods: {
    getTask(id) {
      TaskDataService.get(id)
        .then(response => {
          this.currentTask = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTask.id,
        title: this.currentTask.title,
        description: this.currentTask.description,
        published: status
      };

      TaskDataService.update(this.currentTask.id, data)
        .then(response => {
          this.currentTask.published = status;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateTask() {
      TaskDataService.update(this.currentTask.id, this.currentTask)
        .then(response => {
          console.log(response.data);
          this.message = 'The task was updated successfully!';
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteTask() {
      TaskDataService.delete(this.currentTask.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tasks" });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTask(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
