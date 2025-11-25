// --- 1. Define Constants (Hardcoded NASA/Scientific Data) ---
const DENSITY = 3000; // ρ in kg/m³ (Typical Asteroid Density)
const VELOCITY = 20000; // v in m/s (20 km/s)
// Conversion factor: 1 Megaton of TNT is 4.184 * 10^15 Joules
const MEGALON_TO_JOULE = 4.184e15; 
// Simplified crater scaling constant (adjust for rough estimate)
const CRATER_CONSTANT = 0.00015; 
const CRATER_EXPONENT = 1/3.4;

// --- 2. Get DOM Elements ---
const diameterSlider = document.getElementById('diameter-slider');
const diameterValueSpan = document.getElementById('diameter-value');
const massResult = document.getElementById('mass-result');
const energyResult = document.getElementById('energy-result');
const craterResult = document.getElementById('crater-result');


// --- 3. The Core Calculation Function ---
function calculateImpact() {
    // Get the user-selected diameter in meters
    const D = parseFloat(diameterSlider.value); 
    
    // Update the diameter display
    diameterValueSpan.textContent = D;

    // 1. Calculate Radius and Volume (assuming sphere)
    const R = D / 2;
    // V = (4/3) * π * R³
    const V = (4 / 3) * Math.PI * Math.pow(R, 3);

    // 2. Calculate Mass (M = ρ * V)
    const M = DENSITY * V;

    // 3. Calculate Kinetic Energy (Ek = 0.5 * M * v²)
    const Ek_joules = 0.5 * M * Math.pow(VELOCITY, 2);

    // 4. Convert Energy to Megatons of TNT
    const Ek_megatons = Ek_joules / MEGALON_TO_JOULE;

    // 5. Estimate Crater Diameter (Simplified Scaling Law)
    // Dc ≈ C * (Ek_joules)^ (1/3.4) -- result is in meters
    const D_crater_m = CRATER_CONSTANT * Math.pow(Ek_joules, CRATER_EXPONENT);

    
    // --- 4. Update the Display ---
    
    // Mass: Display in a readable format (e.g., scientific notation for large numbers)
    massResult.textContent = `${M.toExponential(2)} kg`; 

    // Energy: Display in Megatons (formatted to 2 decimal places)
    energyResult.textContent = `${Ek_megatons.toFixed(2)} Megatons (TNT)`; 

    // Crater: Display in a readable unit (km if > 1000m)
    if (D_crater_m >= 1000) {
        craterResult.textContent = `${(D_crater_m / 1000).toFixed(2)} km`;
    } else {
        craterResult.textContent = `${D_crater_m.toFixed(0)} meters`;
    }
}

// --- 5. Event Listener ---
// Recalculate every time the slider value changes
diameterSlider.addEventListener('input', calculateImpact);

// Run the function once on page load to show initial results
calculateImpact();