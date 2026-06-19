const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const replacement = `      <div class="footer-grid">
        <!-- Col 1: Logo & Redes Sociales -->
        <div class="footer-col col-logo">
          <div class="footer-logo-wrap" style="margin-bottom: 20px;">
            <img src="logo-nav.png" alt="Los Maestros" style="max-height: 80px; width: auto;">
          </div>
          <div class="social-icons" style="margin-top: 10px;">
            <h4 class="footer-title" style="margin-bottom: 15px; font-size: 1rem;">Redes Sociales (Seguinos)</h4>
            <a href="https://facebook.com" target="_blank" class="social-link" aria-label="Facebook" style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.75); text-decoration: none; margin-bottom: 10px;">
              <i class="fa-brands fa-facebook-f" style="color: #FFC107; font-size: 1.2rem;"></i> Facebook
            </a>
            <a href="https://instagram.com" target="_blank" class="social-link" aria-label="Instagram" style="display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: rgba(255,255,255,0.75); text-decoration: none;">
              <i class="fa-brands fa-instagram" style="color: #FFC107; font-size: 1.2rem;"></i> Instagram
            </a>
          </div>
        </div>

        <!-- Col 2: Sucursales Table -->
        <div class="footer-col">
          <h4 class="footer-title">Sucursales</h4>
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                  <th style="padding: 10px 5px; color: var(--light); font-weight: 600;">Sucursal</th>
                  <th style="padding: 10px 5px; color: var(--light); font-weight: 600;">Dirección</th>
                  <th style="padding: 10px 5px; color: var(--light); font-weight: 600;">Horario</th>
                  <th style="padding: 10px 5px; color: var(--light); font-weight: 600;">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 12px 5px; color: #FFC107;">Recoleta</td>
                  <td style="padding: 12px 5px;">Paraná 1249</td>
                  <td style="padding: 12px 5px;">7 h a 24 h</td>
                  <td style="padding: 12px 5px;">4815-4430</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <td style="padding: 12px 5px; color: #FFC107;">B. Norte</td>
                  <td style="padding: 12px 5px;">Uriburu 1305</td>
                  <td style="padding: 12px 5px;">7 h a 24 h</td>
                  <td style="padding: 12px 5px;">4821-4658</td>
                </tr>
                <tr>
                  <td style="padding: 12px 5px; color: #FFC107;">Palermo</td>
                  <td style="padding: 12px 5px;">Solo delivery</td>
                  <td style="padding: 12px 5px;">7 h a 24 h</td>
                  <td style="padding: 12px 5px;">4800-1112</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Col 3: Información Adicional -->
        <div class="footer-col">
          <h4 class="footer-title">Información Adicional</h4>
          <h5 style="color: var(--light); margin-bottom: 10px; font-size: 0.95rem; margin-top: 15px;">Métodos de Pago</h5>
          <ul class="footer-links" style="display: flex; flex-direction: column; gap: 8px;">
            <li style="display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-money-bill" style="color: #FFC107;"></i> Efectivo
            </li>
            <li style="display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-credit-card" style="color: #FFC107;"></i> Crédito / Débito
            </li>
            <li style="display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-mobile-screen" style="color: #FFC107;"></i> Mercado Pago
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">&copy; 2026 Los Maestros Pizzería. Todos los derechos reservados. | Créditos: Agencia de Marketing Digital en Argentina</p>
        <div class="footer-bottom-links">
          <a href="#" onclick="alert('Políticas de Privacidad de Los Maestros')">Políticas de Privacidad</a>
          <span class="divider">|</span>
          <a href="#" onclick="alert('Defensa del Consumidor - Enlace oficial')">Defensa del Consumidor</a>
        </div>
      </div>`;

const newContent = content.replace(/      <div class="footer-grid">[\s\S]*?<\/div>\n      <\/div>/, replacement);

fs.writeFileSync('index.html', newContent);
console.log('done');
