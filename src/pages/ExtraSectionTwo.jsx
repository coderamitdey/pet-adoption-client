
const heroes = [
  { name: "Alice", role: "Pet Care Volunteer", img: "https://i.ibb.co.com/Q7d3h4f2/owner1.jpg" },
  { name: "Bob", role: "Adopter", img: "https://i.ibb.co.com/fYX2xMKX/owner2.jpg" },
  { name: "Cathy", role: "Rescue Hero", img: "https://i.ibb.co.com/n8Nj5CyF/owner3.jpg" },
];

const ExtraSectionTwo = () => (
  <section className="mt-12 p-8">
    <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Pet Heroes</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {heroes.map((hero, index) => (
        <div key={index} className="card shadow-xl">
          <figure className="p-3">
            <img src={hero.img} alt={hero.name} className="h-48 rounded-lg w-full object-cover"/>
          </figure>
          <div className="card-body text-center">
            <h3 className="card-title justify-center">{hero.name}</h3>
            <p>{hero.role}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ExtraSectionTwo;
