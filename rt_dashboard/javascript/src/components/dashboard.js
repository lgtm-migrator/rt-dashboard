const html = `
<link href="css/app.css" rel="stylesheet" type="text/css" />
<div class="row">
  <div class="col-6">
    <div class="section">

      <h1>Queues</h1>
      <p class="fixed intro">This list below contains all the registered queues with the number of tasks currently
        in the queue. Select a queue from above to view all tasks currently pending on the queue.</p>

      <table id="queues" class="table table-bordered">
        <thead>
          <tr>
            <th>Queue</th>
            <th class="narrow">Tasks</th>
          </tr>
        </thead>
        <tbody>
          <tr data-role="loading-placeholder">
            <td colspan="2">Loading...</td>
          </tr>
        </tbody>
        <tbody>
          <tr data-role="queue">
            <td>
              <i class="fas fa-inbox"></i>
              <a href="/admin/rt_dashboard/inner/%5Bfailed%5D">[failed]</a>
            </td>
            <td class="narrow">0</td>
          </tr>

          <tr data-role="queue">
            <td>
              <i class="fas fa-inbox"></i>
              <a href="/admin/rt_dashboard/inner/%5Bfinished%5D">[finished]</a>
            </td>
            <td class="narrow">0</td>
          </tr>

          <tr data-role="queue">
            <td>
              <i class="fas fa-inbox"></i>
              <a href="/admin/rt_dashboard/inner/">[running]</a>
            </td>
            <td class="narrow">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="col-6">
    <div class="section">

      <h1>Workers</h1>


      <p id="workers-count" class="fixed intro">
        <button id="workers-btn" type="button" class="btn btn-info">Toggle workers list</button>
        No workers registered!</p>

      <table id="workers" class="table table-bordered">
        <thead>
          <tr>
            <th style="width:48px">State</th>
            <th>Worker</th>
            <th>Queues</th>
          </tr>
        </thead>
        <tbody>
          <tr data-role="loading-placeholder">
            <td colspan="3">Loading...</td>
          </tr>
        </tbody>
        <tbody>
          <tr data-role="worker">
            <td><i class="fas fa-pause"></i></td>
            <td>v-yf.2193</td>
            <td>default, low_prio_queue</td>
          </tr>
        </tbody>
      </table>

      <script name="no-workers-row" type="text/template">
          <tr>
              <td colspan="3">No workers.</td>
          </tr>
      </script>

    </div>
  </div>
</div>

<div class="row">
  <div class="span12">
    <div class="section">

      <h1>Tasks on <strong{% if queue.name == '[failed]' %} class="failed" {% endif %}>{{ queue.name }}</strong>
      </h1>
      <p class="intro">
        <!-- {% if queue.count() %} -->
        <!-- <a href="{{ url_for('empty_queue', queue_name=queue.name) }}" id="empty-btn"
          class="btn btn-danger btn-small" style="float: right" data-toggle="tooltip"
          title="Remove all tasks from this queue (<b>destructive</b>)" data-html=true>
          <i class="fas fa-trash"></i> Empty
        </a> -->
        <!-- {% elif not queue.name.startswith('[') %} -->
        <a href="{{ url_for('delete_queue', queue_name=queue.name) }}" id="empty-btn"
          class="btn btn-danger btn-small" style="float: right" data-toggle="tooltip" title="Delete this queue"
          data-html=true>
          <i class="fas fa-trash"></i> Delete
        </a>
        <!-- {% endif %} -->
        This list below contains all the registered tasks on queue
        <strong>{{ queue.name }}</strong>, sorted by age
        <!-- {% if queue.name.startswith('[') %} -->
        (newest on top).
        <!-- {% else %} -->
        <!-- (oldest on top).
        {% endif %} -->
      </p>

      <table id="jobs" class="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th class="narrow">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr data-role="loading-placeholder">
            <td colspan="2">Loading...</td>
          </tr>
        </tbody>
      </table>

      <script name="no-jobs-row" type="text/template">
          <tr>
              <td colspan="3">No tasks.</td>
          </tr>
      </script>

      <div id="page-selection" class="pagination pagination-centered">
        <ul>
        </ul>
      </div>

      <script name="no-previous-page-link" type="text/template">
          <li class="disabled" ><a href="#" >&laquo;</a></li>
      </script>

      <script name="previous-page-link" type="text/template">
          <li><a href="<%= url %>" >&laquo;</a></li>
      </script>

      <script name="page-link" type="text/template">
          <li><a href="<%= url %>" ><%= number %></a></li>
      </script>

      <script name="next-page-link" type="text/template">
          <li><a href="<%= url %>" >&raquo;</a></li>
      </script>

      <script name="no-next-page-link" type="text/template">
          <li class="disabled" ><a href="#" >&raquo;</a></li>
      </script>

    </div>
  </div>
`

class Dashboard extends HTMLElement {
  constructor () {
    super()
    const template = document.createElement('template')
    template.innerHTML = html

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}
customElements.define('dashboard-component', Dashboard)
