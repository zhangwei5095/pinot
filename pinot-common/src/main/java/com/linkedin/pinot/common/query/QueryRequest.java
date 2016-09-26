/**
 * Copyright (C) 2014-2016 LinkedIn Corp. (pinot-core@linkedin.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.linkedin.pinot.common.query;

import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.ListeningExecutorService;
import com.linkedin.pinot.common.query.context.TimerContext;
import com.linkedin.pinot.common.request.BrokerRequest;
import com.linkedin.pinot.common.request.InstanceRequest;
import com.linkedin.pinot.common.utils.DataTable;
import javax.annotation.Nullable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Class to encapsulate the query request and query processing
 * context within the server. Goal is to make most of the information
 * available to lower levels of code in the server for logging, tracking
 * etc.
 *
 */
public class QueryRequest {
  private static final Logger LOGGER = LoggerFactory.getLogger(QueryRequest.class);

  private InstanceRequest instanceRequest;
  // Future to track result of query execution
  private ListenableFuture<DataTable> resultFuture;
  // Timing information for different phases of query execution
  private final TimerContext timerContext;

  // executor service to parallelize query tasks
  private ListeningExecutorService queryWorkers;

  public QueryRequest(InstanceRequest request) {
    this.instanceRequest = request;
    timerContext = new TimerContext();
  }

  public @Nullable String getClientId() {
    return instanceRequest.getBrokerId();
  }

  /**
   * Convenient method to read table name for query
   * from instance request
   * @return
   */
  public String getTableName() {
    return instanceRequest.getQuery().getQuerySource().getTableName();
  }

  /**
   * Convenient method to read broker request object
   * @return
   */
  public BrokerRequest getBrokerRequest() {
    return instanceRequest.getQuery();
  }

  /**
   * Get the instance request received from broker
   * @return
   */
  public InstanceRequest getInstanceRequest() {
    return instanceRequest;
  }

  /**
   *
   * @return ListenableFuture that will used to track the result
   * of query execution. This can be null if not set
   */
  public ListenableFuture<DataTable> getResultFuture() {
    return resultFuture;
  }

  public void setResultFuture(ListenableFuture<DataTable> resultFuture) {
    this.resultFuture = resultFuture;
  }

  public TimerContext getTimerContext() {
    return timerContext;
  }

  /**
   * Get the executor service to use for running parallel
   * tasks of a query (For ex: planning across all segments)
   * @return
   */
  public ListeningExecutorService getQueryWorkers() {
    return queryWorkers;
  }

  public void setQueryWorkers(ListeningExecutorService queryWorkers) {
    this.queryWorkers = queryWorkers;
  }
}
