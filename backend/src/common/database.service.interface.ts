interface DataBaseInterface {
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
}
