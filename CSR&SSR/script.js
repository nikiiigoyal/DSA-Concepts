function simulateCSR() {
  const demoArea = document.getElementById("demoArea");

  // Step 1: Show empty page
  demoArea.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <h3>📄 Empty HTML received...</h3>
                    <p>Browser got basic HTML shell</p>
                </div>
            `;

  setTimeout(() => {
    // Step 2: Show loading
    demoArea.innerHTML = `
                    <div class="loading" style="display: block;">
                        <div class="spinner"></div>
                        <h3>📦 Downloading JavaScript...</h3>
                        <p>Fetching app code from server</p>
                    </div>
                `;

    setTimeout(() => {
      // Step 3: Show building
      demoArea.innerHTML = `
                        <div class="loading" style="display: block;">
                            <div class="spinner"></div>
                            <h3>🔧 Building the page...</h3>
                            <p>JavaScript is creating the content</p>
                        </div>
                    `;

      setTimeout(() => {
        // Step 4: Show final result
        demoArea.innerHTML = `
                            <div style="text-align: center; padding: 30px;">
                                <h3>🎉 CSR Page Ready!</h3>
                                <p>Total time: ~3-5 seconds</p>
                                <div style="margin-top: 20px; padding: 20px; background: rgba(46, 204, 113, 0.1); border-radius: 10px;">
                                    <h4>📱 Now super interactive!</h4>
                                    <p>Clicks, animations, everything works smoothly</p>
                                    <button style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; margin: 5px;" onclick="this.textContent = 'Clicked!'">Try me!</button>
                                    <button style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; margin: 5px;" onclick="this.style.background = '#2ecc71'">And me!</button>
                                </div>
                            </div>
                        `;
      }, 1500);
    }, 1500);
  }, 1000);
}

function simulateSSR() {
  const demoArea = document.getElementById("demoArea");

  // Step 1: Show loading
  demoArea.innerHTML = `
                <div class="loading" style="display: block;">
                    <div class="spinner"></div>
                    <h3>🏭 Server is building your page...</h3>
                    <p>Creating HTML with all content</p>
                </div>
            `;

  setTimeout(() => {
    // Step 2: Show instant result
    demoArea.innerHTML = `
                    <div style="text-align: center; padding: 30px;">
                        <h3>⚡ SSR Page Ready!</h3>
                        <p>Total time: ~0.5-1 second</p>
                        <div style="margin-top: 20px; padding: 20px; background: rgba(46, 204, 113, 0.1); border-radius: 10px;">
                            <h4>📖 Content visible immediately!</h4>
                            <p>Users can read and see everything right away</p>
                            <div style="text-align: left; margin-top: 15px;">
                                <h5>🔍 SEO loves this:</h5>
                                <p>• Google can read all content<br>
                                • Social media previews work<br>
                                • Fast loading = better rankings</p>
                            </div>
                        </div>
                    </div>
                `;
  }, 800);
}
