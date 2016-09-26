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

package com.linkedin.pinot.common.query.context;

import com.linkedin.pinot.common.metrics.ServerMetrics;
import com.linkedin.pinot.common.metrics.ServerQueryPhase;
import com.linkedin.pinot.common.request.BrokerRequest;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nullable;

public class TimerContext {

  private final ServerMetrics serverMetrics;
  private final Map<ServerQueryPhase, Timer> phaseTimers = new HashMap<>();
  private final BrokerRequest brokerRequest;
  private long queryArrivalTimeNanos;
  
  public class Timer implements AutoCloseable {
    private final ServerQueryPhase queryPhase;
    long startTime;
    long endTime;
    boolean isRunning;

    Timer(ServerQueryPhase phase) {
      this.queryPhase = phase;
    }

    void start() {
      startTime = System.nanoTime();
      isRunning = true;
    }

    void setStartTime(long startTime) {
      this.startTime = startTime;
      isRunning = true;
    }

    public void stopAndRecord() {
      if (isRunning) {
        endTime = System.nanoTime();

        recordPhaseTime(this);
        isRunning = false;
      }
    }

    public long getDuration() {
      return endTime - startTime;
    }

    @Override
    public void close()
        throws Exception {
      stopAndRecord();
    }
  }

  public TimerContext(BrokerRequest brokerRequest, ServerMetrics serverMetrics) {
    this.brokerRequest = brokerRequest;
    this.serverMetrics = serverMetrics;
  }

  public void setQueryArrivalTime(long queryStartTime) {
    this.queryArrivalTimeNanos = queryStartTime;
  }

  public long getQueryArrivalTimeNanos() {
    return queryArrivalTimeNanos;
  }

  /**
   * Creates and starts a new timer for query phase.
   * Calling this again for same phase will overwrite existing timing information
   * @param queryPhase query phase that is being timed
   * @return
   */
  public Timer startNewPhaseTimer(ServerQueryPhase queryPhase) {
    Timer phaseTimer = phaseTimers.put(queryPhase, new Timer(queryPhase));
    phaseTimer.start();
    return phaseTimer;
  }

  public Timer startNewPhaseTimer(ServerQueryPhase queryPhase, long startTime) {
    Timer phaseTimer = startNewPhaseTimer(queryPhase);
    phaseTimer.setStartTime(startTime);
    return phaseTimer;
  }

  public @Nullable Timer getPhaseTimer(ServerQueryPhase queryPhase) {
    return phaseTimers.get(queryPhase);
  }

  public long getPhaseDuration(ServerQueryPhase queryPhase) {
    Timer timer = phaseTimers.get(queryPhase);
    if (timer == null) {
      return -1;
    }
    return timer.getDuration();
  }

  void recordPhaseTime(Timer phaseTimer ) {
    serverMetrics.addPhaseTiming(brokerRequest, phaseTimer.queryPhase, phaseTimer.getDuration());
    phaseTimers.remove(phaseTimer.queryPhase);
  }

  // for logging
  @Override
  public String toString() {
    return String.format("%d,%d,%d,%d,%d,%d,%d,%d", queryArrivalTimeNanos,
        getPhaseDuration(ServerQueryPhase.REQUEST_DESERIALIZATION),
        getPhaseDuration(ServerQueryPhase.SCHEDULER_WAIT),
        getPhaseDuration(ServerQueryPhase.BUILD_QUERY_PLAN),
        getPhaseDuration(ServerQueryPhase.QUERY_PLAN_EXECUTION),
        getPhaseDuration(ServerQueryPhase.QUERY_PROCESSING),
        getPhaseDuration(ServerQueryPhase.RESPONSE_SERIALIZATION),
        getPhaseDuration(ServerQueryPhase.TOTAL_QUERY_TIME));
  }
}
