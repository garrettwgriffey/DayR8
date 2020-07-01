import React from "react";

export default function Test() {
  return (
    <div>
        <button className="js-notify-btn">Notify me!</button>
        <button className="js-push-btn">Enable Push Messaging</button>
        <section className="js-sub-endpoint" style={{display:'none', width:'80%'}}>
            <h3>Subscription Object:</h3>
            <code className="js-subscription-json"></code>
            <h3>Endpoint URL:</h3>
            <code className="js-endpoint-url"></code>
        </section>
    </div>
  );
}
