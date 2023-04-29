const defaultChuck= 
`// Blit 2
Blit s => ADSR e => JCRev r => dac;
.5 => s.gain;
.05 => r.mix;

// set adsr
e.set( 5::ms, 3::ms, .5, 5::ms );

// an array
[ 0, 2, 4, 7, 9, 11 ] @=> int hi[];

// infinite time loop
while( true )
{
    // frequency
    Std.mtof( 33 + Math.random2(0,3) * 12 +
        hi[Math.random2(0,hi.size()-1)] ) => s.freq;

    // harmonics
    Math.random2( 1, 5 ) => s.harmonics;

    // key on
    e.keyOn();
    // advance time
    120::ms => now;
    // key off
    e.keyOff();
    // advance time
    5::ms => now;
}
`;

const defaultFaust= 
`/* A simple waveshaper effect */
declare name "fuzz -- a simple distortion effect";
declare author "Bram De Jong (from musicdsp.org)";
declare version "1.0";

import ("music.lib");

// CHANGE ME!
distortion = 30; // input a number between 0 and 100
gain = 3; // dB

// waveshape function 
f(a,x) = x * (abs(x) + a) / (x * x + (a - 1) * abs(x) + 1);

// distortion gain compensation 
g(a) = 1 / sqrt(a + 1);

/* Take in ChucK output as input and process */
process = (out, out)
with { 
    out(x) = db2linear(gain)*g(dist)*f(db2linear(dist),x); 
};
`;

export { defaultChuck, defaultFaust };