function archiveOldEmailsByLabel(label, delayDays, excludeLabel) {
  var batchSize = 100;

  var search = "'in:inbox !is:starred older_than:" + delayDays + "d label:\"" + label + "\"";

  if (excludeLabel != null) {
    search = search + " -label:\"" +  excludeLabel + "\"";
  }

  search = search + "'";

  var autoArchived = GmailApp.getUserLabelByName("auto-archived");
  if (autoArchived == null) {
    autoArchived = GmailApp.createLabel("auto-archived");
  }

  var batch = GmailApp.search(search, 0, batchSize);
  while (batch != null && batch.length > 0) {
    autoArchived.addToThreads(batch);
    GmailApp.moveThreadsToArchive(batch);
    batch = GmailApp.search(search, 0, batchSize);
  }
}

function main() {
  archiveOldEmailsByLabel("archive-this", 10, "but-not-this");
  archiveOldEmailsByLabel("archive-this2", 10, null);
}
